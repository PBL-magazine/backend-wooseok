const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models')

require('dotenv').config({ path: 'src/.env' });
const PORT = process.env.PORT

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const postController = require('./post/post.controller');
app.use('/api/posts', postController);

const authController = require('./auth/auth.controller');
app.use('/api/users', authController);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`on port ${PORT}`)
  })
})