"use strict";

module.exports = (sequelize, DataTypes) => {
  const ChecklistItem = sequelize.define(
    "ChecklistItem",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      content: { type: DataTypes.TEXT, allowNull: false },
      isDone: {
        field: "is_done",
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      orderIndex: {
        field: "order_index",
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dueAt: { field: "due_at", type: DataTypes.DATE },
      doneAt: { field: "done_at", type: DataTypes.DATE },
      assigneeId: { field: "assignee_id", type: DataTypes.UUID },
      checklistId: {
        field: "checklist_id",
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "checklist_items",
      underscored: true,
      timestamps: true,
    }
  );

  ChecklistItem.associate = (models) => {
    ChecklistItem.belongsTo(models.User, {
      as: "assignee",
      foreignKey: "assignee_id",
    });
    ChecklistItem.belongsTo(models.Checklist, {
      as: "checklist",
      foreignKey: "checklist_id",
    });
  };

  return ChecklistItem;
};
