const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config({ path: 'src/.env' });
const PORT = process.env.PORT

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const postController = require('./post/post.controller');
app.use('/api/post', postController);

// const likeController = require('./like/like.controller');
// app.use('/api/post', likeController);

// const authController = require('./auth/auth.controller');
// app.use('/api', postController);

app.listen(PORT, () => {
  console.log(`on port ${PORT}`)
})