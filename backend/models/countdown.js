"use strict";
module.exports = (sequelize, DataTypes) => {
  const Countdown = sequelize.define(
    "Countdown",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: { type: DataTypes.TEXT, allowNull: false },
      description: DataTypes.TEXT,
      targetAt: { field: "target_at", type: DataTypes.DATE, allowNull: false },
      theme: DataTypes.JSONB,
      ownerId: { field: "owner_id", type: DataTypes.UUID, allowNull: false },
    },
    {
      tableName: "countdowns",
      underscored: true,
      timestamps: true,
    }
  );

  Countdown.associate = (models) => {
    Countdown.belongsTo(models.User, { as: "owner", foreignKey: "owner_id" });
    Countdown.hasMany(models.CountdownMember, {
      as: "members",
      foreignKey: "countdown_id",
      onDelete: "CASCADE",
    });
    Countdown.hasMany(models.Note, {
      as: "notes",
      foreignKey: "countdown_id",
      onDelete: "CASCADE",
    });
    Countdown.hasMany(models.Checklist, {
      as: "checklists",
      foreignKey: "countdown_id",
      onDelete: "CASCADE",
    });
    Countdown.hasMany(models.ActivityLog, {
      as: "activity",
      foreignKey: "countdown_id",
      onDelete: "CASCADE",
    });
  };

  return Countdown;
};
