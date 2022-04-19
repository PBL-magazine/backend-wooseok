const express = require('express');
const CommentService = require('./comment.service');
const router = express.Router({ mergeParams: true });
const { verifiedToken } = require('../middleware/verifytoken');

// 1. 특정 게시글 전체 댓글 조회
router.get('/', async (req, res) => {
  const { post_id } = req.params;
  const comments = await CommentService.findAllComments(post_id);
  return res.status(200).json({
    ok: true,
    rows: comments,
  });
});

// 2. 특정 게시글 댓글 생성
router.post('/', verifiedToken, async (req, res) => {
  try {
    const { post_id } = req.params;
    const { content } = req.body;
    const { user } = res.locals;

    const user_id = user.user_id;

    CommentService.addComment(content, post_id, user_id);

    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// 3. 특정 게시글의 댓글 수정
router.patch('/:comment_id', verifiedToken, async (req, res) => {
  const { comment_id } = req.params;
  const { content } = req.body;

  try {
    CommentService.updateComment(comment_id, content);

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// 4. 특정 게시글의 댓글 삭제
router.delete('/:comment_id', verifiedToken, async (req, res) => {
  try {
    const { comment_id } = req.params;
    await CommentService.deleteComment(comment_id);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
