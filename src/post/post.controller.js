const express = require('express');
const PostService = require('./post.service');
const router = express.Router();

// 전체 게시글 가져오기
router.get('/', async (req, res) => {
  const posts = await PostService.getAllPost();

  res.json({ posts })
});

// 게시글 추가
router.post('/', (req, res) => {
  const { content, image } = req.body;
  const response = PostService.addPost(content, image);

  res.json(response);
})

router.get('/:post_id', (req, res) => {
  
})



module.exports = router;