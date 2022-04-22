const jwt = require('jsonwebtoken')
const { Users, Posts, Comments, Likes } = require('../../src/models')
const bcrypt = require('bcrypt')
const AuthService = require('../../src/auth/auth.service');
require('dotenv').config({ path: 'src/.env' });

const userOne = {
  email: 'test@example.com',
  nickname: 'nicktest',
  password: 'q1w2e3r4',
}

const postOne = {
  post_id: 1,
  content: 'post del test',
  image_url: './uploads/abcd',
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  user_id: 1
}


// const setupDatabase = async () => {
const setupUserDatabase = async () => {
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
}

const setupPostDatabase = async () => {
  await Posts.destroy({
    where : {},
    truncate: false,
  })

  Posts.create(postOne)
}

module.exports = {
  userOne,
  setupUserDatabase,
  setupPostDatabase
}