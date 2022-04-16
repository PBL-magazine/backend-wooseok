'use strict'

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    
  },
  {
    timestamps: false,
    underscore: true,
    tableName: 'likes'
  })

  Likes.removeAttribute('id')
  
  return Likes
}