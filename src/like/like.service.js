const { Likes } = require('../models')

module.exports = LikeService = {

  // 좋아요 상태 확인
  chkLiked: async (post_id, user_id) => {
    return await Likes.findOne({ where: { post_id, user_id } })
  },
  // 좋아요 상태 변경
  changeLike: async (liked, post_id, user_id) => {
    if (!liked) {
      Likes.create({
        post_id,
        user_id,
      })
    } else {
      Likes.destroy({
        where: {
          post_id,
          user_id,
        }
      })
    }
  },

  getLikesById: async (post_id) => {
    return await Likes.findAll({
      raw: true,
      where: { post_id }
    })
  },


  getLikes: async () => {
    return await Likes.findAll({ raw: true });
  }

  

}