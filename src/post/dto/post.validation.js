'use strict';

const PostService = require('../post.service');

const PostValidation = {
  Content: (req, res, next) => {
    const { content } = req.body;

    if (!content) {
      return res.status(400).send({
        ok: false,
        message: '게시물의 내용을 입력하세요.',
      });
    }
    next();
  },
  WriterMatch: async (req, res, next) => {
    const { post_id } = req.params;
    const { user_id } = res.locals.user;

    // 해당 포스트의 user_id와 user.user_id가 같은지 확인
    const post = await PostService.findPostById(post_id);
    if (!post) {
      return res.status(404).json({
        ok: false,
        message: '해당 게시물 정보를 찾을 수 없습니다.',
      });
    }

    if (post.user_id !== user_id) {
      if (req.method === 'DELETE') {
        return res.status(401).json({
          ok: false,
          message: '게시글 작성자만 삭제할 수 있습니다.',
        });
      } else if (req.method === 'PATCH') {
        return res.status(401).json({
          ok: false,
          message: '게시글 작성자만 수정할 수 있습니다.',
        });
      }
    }
    next();
  },
};

module.exports = PostValidation;
