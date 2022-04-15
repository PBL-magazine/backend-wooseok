'use strict';

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    id: {
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
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true
  })


  Posts.associate = (models) => {

    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    })

  }

  
  return Posts
}