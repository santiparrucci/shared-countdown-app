const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
