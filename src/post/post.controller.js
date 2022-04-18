const express = require('express');
const PostService = require('./post.service');
const router = express.Router();
const { verifiedToken } = require('../middleware/verifytoken');
const multer = require('multer');
const PostValidation = require('./dto/post.validation');

const uploader = multer({ dest: 'uploads/' });

// 1. 전체 게시글 가져오기
router.get('/', async (req, res) => {
  const results = await PostService.getAllPost();

  return res.status(200).json({
    ok: true,
    rows: results,
  });
});

// 2. 게시글 추가
router.post(
  '/',
  verifiedToken,
  PostValidation.Content,
  uploader.single('file'),
  async (req, res) => {
    const { file } = req;
    const { content } = req.body;
    const { user_id } = res.locals.user;

    const imagePath = file ? `/uploads/${req.file.filename}` : null;

    const response = await PostService.addPost(content, imagePath, user_id);

    if (response.success) {
      return res.status(201).json({
        ok: true,
      });
    }
    return res.status(500).json({
      status: '500 Internal Server Error',
    });
  }
);

// 3. 특정 게시물 조회
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const post = await PostService.findPostById(post_id);
  res.status(200).json({
    ok: true,
    rows: post,
  });
});

// 4. 특정 게시물 수정
router.patch(
  '/:post_id',
  verifiedToken,
  PostValidation.WriterMatch,
  PostValidation.Content,
  uploader.single('file'),
  async (req, res) => {
    const { post_id } = req.params;
    const { content } = req.body;

    PostService.updatePost(post_id, content);

    return res.status(200).json({
      ok: true,
    });
  }
);

// 5. 특정 게시물 삭제
router.delete(
  '/:post_id',
  verifiedToken,
  PostValidation.WriterMatch,
  async (req, res) => {
    try {
      const { post_id } = req.params;
      await PostService.deletePost(post_id);
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;
