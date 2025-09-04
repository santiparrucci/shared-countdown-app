"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: { type: DataTypes.TEXT, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        defaultValue: [],
      },
      countdownId: {
        field: "countdown_id",
        type: DataTypes.UUID,
        allowNull: false,
      },
      authorId: { field: "author_id", type: DataTypes.UUID },
    },
    {
      tableName: "notes",
      underscored: true,
      timestamps: true,
    }
  );

  Note.associate = (models) => {
    Note.belongsTo(models.Countdown, {
      as: "countdown",
      foreignKey: "countdown_id",
    });
    Note.belongsTo(models.User, { as: "author", foreignKey: "author_id" });
  };

  return Note;
};
