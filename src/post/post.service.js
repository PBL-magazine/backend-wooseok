const { Posts, Users } = require('../models')

module.exports = PostService = {
  // 전체 게시글 가져오기
  getAllPost: async () => {
    const posts = await Posts.findAll(); // api 한번 더 살필것
    
    return posts
  },

  // 게시글 추가
  addPost: async (content, image_url, UserId) => {
    // try {
    //   if (!content || !image_url || !UserId) {
    //     return res.status(400).json({
    //       data: {
    //         ok: false,
    //         message: '내용을 입력하세요.'
    //       }
    //     })
    //   }
    //   console.log(content, image_url, UserId)
    //   Posts.create({
    //     content,
    //     image_url,
    //     UserId
    //   })
    //   return { success: true };
    // } catch (error) {
    //   return { success: false };
    // }
  },

  // 특정 게시물 가져오기
  findPostById: async (postId) => {
    return await Posts.findByPk(postId);
  }
}
