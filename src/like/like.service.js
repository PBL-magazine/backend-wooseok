const { Likes } = require('../models')

module.exports = LikeService = {

  // 좋아요 상태 확인
  chkLiked: async (PostId, UserId) => {
    return await Likes.findOne({ where: { PostId, UserId } })
  },
  // 좋아요 상태 변경
  changeLike: async (liked, PostId, UserId) => {
    if (!liked) {
      Likes.create({
        PostId,
        UserId,
      })
    } else {
      Likes.destroy({
        where: {
          PostId,
          UserId,
        }
      })
    }
  },

  

}