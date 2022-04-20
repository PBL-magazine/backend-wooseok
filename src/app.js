const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const db = require('./models');

require('dotenv').config({ path: 'src/.env' });
const PORT = process.env.PORT;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/image', express.static('uploads'));

app.use(express.static(path.join(__dirname, '../client/build')));

// like 라우터
const likeController = require('./like/like.controller');
app.use('/api/posts/:post_id', likeController);

// post 라우터
const postController = require('./post/post.controller');
app.use('/api/posts', postController);

// comment 라우터
const commentController = require('./comment/comment.controller');
app.use('/api/posts/:post_id/comments', commentController);

// auth,user 라우터
const authController = require('./auth/auth.controller');
app.use('/api/users', authController);

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

// 404 handling
// app.get('*', (req, res) => {
//   res.status(404).json({
//     ok: false,
//   });
// });

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`on port ${PORT}`);
  });
});


module.exports = app