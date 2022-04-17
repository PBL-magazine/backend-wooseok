'use strict'

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_id: {
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
    underscored: true,
    tableName: 'users'
  })


    Users.associate = (models) => {
      Users.hasMany(models.Posts, {
        onDelete: "cascade",
        foreignKey: 'user_id',
      })

      Users.hasMany(models.Comments, {
        onDelete: "cascade",
        foreignKey: 'user_id',

      })

      Users.hasMany(models.Likes, {
        onDelete: "cascade",
        foreignKey: 'user_id',
      })
    }

  return Users
}
