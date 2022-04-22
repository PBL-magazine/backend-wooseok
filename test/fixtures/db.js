const jwt = require('jsonwebtoken')
const { Users, Posts, Comments, Likes } = require('../../src/models')
const bcrypt = require('bcrypt')
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
  // await Users.create(userOne)

  await bcrypt.hash(userOne.password, 10).then((hash) => {
    // AuthService.createUser(
    //   userOne.email,
    //   userOne.nickname,
    //   hash
    // );
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
  // await PostService.addPost(
  //   postOne.content,
  //   postOne.image_url,
  //   postOne.user_id
  // )
}

const setupCommentDatabase = async () => {
  await Comments.destroy({
    where : {},
    truncate: false
  })

  Comments.create(commentOne)
  // await commentService.addComment()
}

module.exports = {
  userOne,
  setupUserDatabase,
  setupPostDatabase,
  setupCommentDatabase
}