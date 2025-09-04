"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.TEXT,
      email: { type: DataTypes.TEXT, allowNull: false, unique: true },
      passwordHash: {
        field: "password_hash",
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      underscored: true, // mapea created_at/updated_at
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Countdown, {
      as: "countdowns",
      foreignKey: "owner_id",
    });
    User.hasMany(models.CountdownMember, {
      as: "memberships",
      foreignKey: "user_id",
    });
    User.hasMany(models.Note, { as: "notes", foreignKey: "author_id" });
    User.hasMany(models.ChecklistItem, {
      as: "assignedItems",
      foreignKey: "assignee_id",
    });
    User.hasMany(models.ActivityLog, {
      as: "activities",
      foreignKey: "actor_id",
    });
  };

  return User;
};
