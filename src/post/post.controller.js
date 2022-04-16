const express = require('express');
const PostService = require('./post.service');
const router = express.Router();
const { verifiedToken } = require('../middleware/verifytoken')
const multer = require('multer');
const PostValidation = require('./dto/post.validation');

const uploader = multer({ dest: 'uploads/' })


// 1. 전체 게시글 가져오기
router.get('/', async (req, res) => {
  const results = await PostService.getAllPost();
  res.status(200).json({
    ok: true,
    rows: results
  })
});

// 2. 게시글 추가
router.post(
  '/',
  verifiedToken, 
  PostValidation.Content,
  uploader.single('file'),  
  async (req, res) => {
    const { file } = req;
    const { id } = res.locals.user.dataValues;

    const imagePath = file ? `/image/${req.file.filename}` : null;

    const response = await PostService.addPost(content, imagePath, id);

    if (response.success) {
      return res.status(201).json({
        ok: true
      });
    }
    return res.status(500).json({
      status: '500 Internal Server Error'
    })
  }
)

// 3. 특정 게시물 조회
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const post = await PostService.findPostById(post_id);
  res.status(200).json({
    ok: true,
    rows: post
  })
})

// 4. 특정 게시물 수정
router.patch(
  '/:post_id', 
  verifiedToken, 
  PostValidation.Content,
  uploader.single('file'),  
  async (req, res) => {
    const { post_id } = req.params;
    const { content } = req.body;

    PostService.updatePost(post_id, content)

    return res.status(200).json({
      ok: true
    })
  }
)

// 5. 특정 게시물 삭제
router.delete(
  '/:post_id'
  , verifiedToken
  , async (req, res) => {
    try {
      const { post_id } = req.params;
      await PostService.deletePost(post_id)
      return res.status(200).json({
        ok: true,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
})


// 7. 특정 게시글 전체 댓글 조회
router.get('/:post_id/comments', async (req, res) => {
  const { post_id } = req.params;
  const comments = await PostService.findAllComments(post_id);

  return res.status(200).json({
    ok: true,
    rows: comments
  })
})

// 8. 특정 게시글 댓글 생성
router.post('/:post_id/comments', verifiedToken, async (req, res) => {
  try {
    const { post_id } = req.params;
    const { content } = req.body;
    const { user } = res.locals;

    const user_id = user.id

    PostService.addComment(post_id, content, user_id)

    return res.status(201).json({
      ok: true
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
})

// 9. 특정 게시글의 댓글 수정
router.patch('/:post_id/comments/:comment_id', verifiedToken, async (req, res) => {
  const { comment_id } = req.params;
  const { content } = req.body;

  try {
    PostService.updateComment(comment_id, content)

    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
})

// 10. 특정 게시글의 댓글 삭제
router.delete('/:post_id/comments/:comment_id', verifiedToken, async (req, res) => {
  try {
    const { comment_id } = req.params;
    await PostService.deleteComment(comment_id);
    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
})

module.exports = router;