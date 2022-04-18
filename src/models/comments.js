'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'comments',
    }
  );

  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });

    Comments.belongsTo(models.Posts, {
      foreignKey: 'post_id',
      as: 'post',
    });
  };

  return Comments;
};
