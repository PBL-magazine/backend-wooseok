const { Post } = require('../../models')

module.exports = PostService = {
  // 전체 게시글 가져오기
  getAllPost: async () => {
    return await Post.findAll();
  },

  // 게시글 추가
  addPost: async (content, image) => {
    if (!content || !image) {
      return { message: '정보를 입력해주세요.' }
    }
    Post.create({
      content,
      image,
    })
    return { success: true }
  }
}