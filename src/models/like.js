'use strict'

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'likes'
  })

  Likes.removeAttribute('id')

  Likes.associate = (models) => {
    Likes.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    })

    Likes.belongsTo(models.Posts, {
      foreignKey: 'post_id',
      as: 'post',
    })
  }
  
  return Likes
}