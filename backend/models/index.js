"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config(); // por las dudas, aunque ya carga en config.js

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env]; // <-- JS, no JSON

const db = {};
let sequelize;

if (config.use_env_variable) {
  // Usa DATABASE_URL + opciones del config
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: config.dialect,
    logging: config.logging,
    dialectOptions: config.dialectOptions,
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Carga automática de modelos (compat: CJS y ESM)
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
  )
  .forEach((file) => {
    const mod = require(path.join(__dirname, file));
    const defineModel = mod.default || mod; // soporta export default

    if (typeof defineModel !== "function") {
      throw new Error(
        `El archivo de modelo "${file}" no exporta una función. ` +
          `Asegurate de usar: module.exports = (sequelize, DataTypes) => {...}`
      );
    }

    const model = defineModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
