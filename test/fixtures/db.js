const jwt = require('jsonwebtoken')
const { Users, Posts, Comments, Likes } = require('../../src/models')
const bcrypt = require('bcrypt')
const AuthService = require('../../src/auth/auth.service')
require('dotenv').config({ path: 'src/.env' });

const userOne = {
  email: 'test@example.com',
  nickname: 'nicktest',
  password: 'q1w2e3r4',
}

const setupDatabase = async () => {
  await Users.destroy({
    where : {},
    truncate: false,
  })
  // await Users.create(userOne)

  await bcrypt.hash(userOne.password, 10).then((hash) => {
    AuthService.createUser(
      userOne.email,
      userOne.nickname,
      hash
    );
  });

  Posts.destroy({
    where: {},
    truncate: false,
  })

  await Posts.create()
}

module.exports = {
  userOne,
  setupDatabase
}