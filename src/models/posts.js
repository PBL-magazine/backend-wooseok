'use strict';

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'posts'
  })



  Posts.associate = (models) => {

    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
      foreignKey: "post_id",
    })

    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
      foreignKey: "post_id",
    })

    Posts.belongsTo(models.Users, {
      foreignKey: "user_id"
    })

  }
  
  return Posts
}