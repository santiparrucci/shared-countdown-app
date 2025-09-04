"use strict";
module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define(
    "ActivityLog",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      action: { type: DataTypes.TEXT, allowNull: false },
      payload: { type: DataTypes.JSONB },
      countdownId: {
        field: "countdown_id",
        type: DataTypes.UUID,
        allowNull: false,
      },
      actorId: { field: "actor_id", type: DataTypes.UUID },
    },
    {
      tableName: "activity_logs",
      underscored: true,
      timestamps: true,
    }
  );

  ActivityLog.associate = (models) => {
    ActivityLog.belongsTo(models.Countdown, {
      as: "countdown",
      foreignKey: "countdown_id",
    });
    ActivityLog.belongsTo(models.User, { as: "actor", foreignKey: "actor_id" });
  };

  return ActivityLog;
};
