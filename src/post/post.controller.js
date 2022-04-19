const express = require('express');
const PostService = require('./post.service');
const router = express.Router();
const { verifiedToken } = require('../middleware/verifytoken');
const multer = require('multer');
const PostValidation = require('./dto/post.validation');

const uploader = multer({ dest: 'uploads/' });

// 1. 전체 게시글 가져오기
/**
* @swagger
* paths:
*  /api/posts:
*   get:
*     tags: [Post]
*     summary: 전체 게시물 조회
*     responses:
*       "200":
*         description: 전체 조회 성공,
*/
router.get('/', async (req, res) => {
  try {
    const results = await PostService.getAllPost();
    return res.status(200).json({
      ok: true,
      rows: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }

});

// 2. 게시글 추가
/**
* @swagger
* paths:
*  /api/posts:
*   post:
*     tags: [Post]
*     summary: 게시물 생성
*     responses:
*       "201":
*         description: 게시글 추가 성공,
 */
router.post(
  '/',
  verifiedToken,
  uploader.single('image'),
  PostValidation.Content,
  async (req, res) => {
    const { file } = req;
    const { content } = req.body;
    const { user_id } = res.locals.user;

    const imagePath = file ? `/image/${req.file.filename}` : null;

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
/**
* @swagger
* paths:
*  /api/posts/{post_id}:
*   post:
*     tags: [Post]
*     summary: 특정 게시물 조회
*     parameters: post_id
*     responses:
*       "200":
*         description: 게시글 조회 성공
 */
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const post = await PostService.findPostById(post_id);
  res.status(200).json({
    ok: true,
    row: post,
  });
});

// 4. 특정 게시물 수정
/**
* @swagger
* paths:
*  /api/posts/{post_id}:
*   patch:
*     tags: [Post]
*     summary: 특정 게시물 수정
*     parameters: post_id
*     responses:
*       "200":
*         description: 게시글 수정 성공
 */
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
/**
* @swagger
* paths:
*  /api/posts/{post_id}:
*   delete:
*     tags: [Post]
*     summary: 특정 게시물 삭제
*     parameters: post_id
*     responses:
*       "200":
*         description: 게시글 삭제 성공
 */
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
