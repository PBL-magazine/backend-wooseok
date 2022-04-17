const { Posts, Likes, Comments, Users, sequelize } = require('../models')

module.exports = PostService = {
  // 전체 게시글 가져오기
  getAllPost: async () => {
    // const posts = await Posts.findAll({ include: Users }); // api 한번 더 살필것
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ['user_id', 'email', 'nickname', 'role']
        }
      ],
      where: {
        deleted_at: null
      }
    });
    
    return posts;
  },

  // 게시글 추가
  addPost: async (content, image_url, user_id) => {
    try {
      if (!content || !image_url || !user_id) {
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
        user_id
      })
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  // 특정 게시물 가져오기
  findPostById: async (post_id) => {
    return await Posts.findOne({
      include: [{
        model: Users,
        attributes: ['user_id', 'email', 'nickname', 'role']
      }],
      raw: true,
      where : {
        post_id,
        deleted_at: null
        // attributes: { include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'likes']] }
      }
    });
  },

  // 게시글 수정
  updatePost: async (post_id, content) => {
    await Posts.update({
      content
    },{
      where: {
        post_id
      }
    })
  },

  // 게시글 삭제
  deletePost: async (post_id) => {
    await Posts.update({
      deletedAt: new Date(),
    }, {
      where: { post_id },
    })
    return;
  },

}
