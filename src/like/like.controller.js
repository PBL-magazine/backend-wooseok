const express = require('express');
const LikeService = require('./like.service');
const PostService = require('../post/post.service')
const router = express.Router({ mergeParams: true });
const { verifiedToken } = require('../middleware/verifytoken')
const multer = require('multer');

const uploader = multer({ dest: 'uploads/' })

// 6. 좋아요 상태 변경
router.patch('/like', verifiedToken, async (req, res) => {
  const { post_id } = req.params;
  const { user } = res.locals;
  console.log('조아요!!!')

  console.log(user)
  const liked = await LikeService.chkLiked(post_id, user.id);
  await LikeService.changeLike(liked, post_id, user.id);

  res.status(200).json({
    ok: true
  })

})



module.exports = router;