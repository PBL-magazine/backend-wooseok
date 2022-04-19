const express = require('express');
const LikeService = require('./like.service');
const PostService = require('../post/post.service');
const router = express.Router({ mergeParams: true });
const { verifiedToken } = require('../middleware/verifytoken');
const multer = require('multer');

// 1. 좋아요 상태 변경
/**
* @swagger
* paths:
*  /api/posts/{post_id}/like:
*   patch:
*     tags: [Like]
*     summary: 전체 게시물 조회
*     responses:
*       "200":
*         description: 전체 조회 성공,
*/
router.patch('/like', verifiedToken, async (req, res) => {
  const { post_id } = req.params;
  const { user } = res.locals;

  const liked = await LikeService.chkLiked(post_id, user.user_id);
  await LikeService.changeLike(liked, post_id, user.user_id);

  res.status(200).json({
    ok: true,
  });
});

module.exports = router;
