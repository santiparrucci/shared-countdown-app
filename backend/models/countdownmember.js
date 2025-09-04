"use strict";
module.exports = (sequelize, DataTypes) => {
  const CountdownMember = sequelize.define(
    "CountdownMember",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      role: {
        type: DataTypes.ENUM("owner", "editor", "viewer"),
        allowNull: false,
      },
      countdownId: {
        field: "countdown_id",
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: { field: "user_id", type: DataTypes.UUID, allowNull: false },
    },
    {
      tableName: "countdown_members",
      underscored: true,
      timestamps: true,
    }
  );

  CountdownMember.associate = (models) => {
    CountdownMember.belongsTo(models.Countdown, {
      as: "countdown",
      foreignKey: "countdown_id",
    });
    CountdownMember.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
  };

  return CountdownMember;
};
