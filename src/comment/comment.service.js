const { Comments, Users } = require('../models');

module.exports = CommentService = {
  // 특정 게시글의 전체 댓글 조회
  findAllComments: async (post_id) => {
    return await Comments.findAll({
      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname', 'role'],
        },
      ],
      raw: true,
      nest: true,
      where: {
        post_id,
        deleted_at: null,
      },
    });
  },

  // 댓글 생성
  addComment: async (content, post_id, user_id) => {
    Comments.create({
      content,
      post_id,
      user_id,
    });

    return;
  },

  // 댓글 수정
  updateComment: async (comment_id, content) => {
    await Comments.update(
      {
        content,
      },
      {
        where: {
          comment_id,
        },
      }
    );
    return;
  },

  deleteComment: async (comment_id) => {
    await Comments.update(
      {
        deleted_at: new Date(),
      },
      {
        where: {
          comment_id,
        },
      }
    );
    return;
  },
};
