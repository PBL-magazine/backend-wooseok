'use strict'

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    timestamps: false,
    underscore: true,
  })

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    })

    Users.hasMany(models.Comments, {
      onDelete: "cascade"
    })
  }

  
  return Users
}