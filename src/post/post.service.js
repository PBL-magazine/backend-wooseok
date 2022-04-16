const { Posts, Likes, Comments, Users, sequelize } = require('../models')

module.exports = PostService = {
  // 전체 게시글 가져오기
  getAllPost: async () => {
    const posts = await Posts.findAll({ include: Comments }); // api 한번 더 살필것
    
    return posts
  },

  // 게시글 추가
  addPost: async (content, image_url, UserId) => {
    try {
      if (!content || !image_url || !UserId) {
        return res.status(400).json({
          data: {
            ok: false,
            message: '내용을 입력하세요.'
          }
        })
      }

      Posts.create({
        content,
        image_url,
        UserId
      })
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  // 특정 게시물 가져오기
  findPostById: async (postId) => {
    return await Posts.findOne({
      where : {
        id: postId,
        attributes: { include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'likes']] }
      }
    });
  },

  // 게시글 수정
  updatePost: async (PostId, content) => {
    await Posts.update({
      content
    },{
      where: {
        id: PostId
      }
    })
  },

  // 게시글 삭제
  deletePost: async (PostId) => {
    await Posts.update({
      deletedAt: new Date(),
    }, {
      where: { id: PostId },
    })
    return;
  },

  // 특정 게시글의 전체 댓글 조회
  findAllComments: async (PostId) => {
    return await Comments.findAll({
      where: {
        PostId
      }
    })
  },

  // 댓글 생성
  addComment: async (PostId, content, UserId) => {
    Comments.create({
      PostId,
      content,
      UserId
    })

    return;
  },

  // 댓글 수정
  updateComment: async (CommentId, content) => {
    await Comments.update({
      content
    }, {
      where: {
        id: CommentId
      }
    })
    return;
  },

  deleteComment: async (CommentId) => {
    await Comments.update({
      deletedAt: new Date()
    }, {
      where: {
        id: CommentId,
      }
    })
    return;
  }
}
