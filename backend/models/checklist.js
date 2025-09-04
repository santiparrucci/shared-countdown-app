"use strict";
module.exports = (sequelize, DataTypes) => {
  const Checklist = sequelize.define(
    "Checklist",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: { type: DataTypes.TEXT, allowNull: false },
      countdownId: {
        field: "countdown_id",
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "checklists",
      underscored: true,
      timestamps: true,
    }
  );

  Checklist.associate = (models) => {
    Checklist.belongsTo(models.Countdown, {
      as: "countdown",
      foreignKey: "countdown_id",
    });
    Checklist.hasMany(models.ChecklistItem, {
      as: "items",
      foreignKey: "checklist_id",
      onDelete: "CASCADE",
    });
  };

  return Checklist;
};
