const jwt = require('jsonwebtoken')
const { Users, Posts, Comments, Likes } = require('../../src/models')
const bcrypt = require('bcryptjs')
const AuthService = require('../../src/auth/auth.service');
const PostService = require('../../src/post/post.service');
const commentService = require('../../src/comment/comment.service');
require('dotenv').config({ path: 'src/.env' });

const userOne = {
  user_id: 1,
  email: 'test@example.com',
  nickname: 'nicktest',
  password: 'q1w2e3r4',
  role: 1
}

const postOne = {
  post_id: 1,
  content: 'post del test',
  image_url: './uploads/abcd',
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  user_id: 1,
}

const commentOne = {
  comment_id: 1,
  content: 'test comment',
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  user_id: 1,
  post_id: 1
}


// const setupDatabase = async () => {
const setupUserDatabase = async () => {
  await Users.destroy({
    where : {},
    truncate: false,
  })

  await bcrypt.hash(userOne.password, 10).then((hash) => {
    Users.create({
      user_id: 1,
      email: 'test@example.com',
      nickname: 'nicktest',
      password: hash,
      role: 1
    })
  });
}

const setupPostDatabase = async () => {
  await Posts.destroy({
    where : {},
    truncate: false,
  })

  Posts.create(postOne)
}

const setupCommentDatabase = async () => {
  await Comments.destroy({
    where : {},
    truncate: false
  })

  Comments.create(commentOne)
}

const getToken = async () => {
  return jwt.sign({
    email: userOne.email,
    nickname: userOne.nickname
  }, process.env.SECRET)
}

module.exports = {
  userOne,
  setupUserDatabase,
  setupPostDatabase,
  setupCommentDatabase,
  getToken
}