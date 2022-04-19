const { Posts, Likes, Comments, Users, sequelize } = require('../models');
const LikeService = require('../like/like.service');

module.exports = PostService = {
  // 전체 게시글 가져오기
  getAllPost: async () => {

    // const [posts, likes] = await Promise.all([
    //   await Posts.findAll({
    //     include: [
    //       {
    //         model: Users,
    //         as: 'user',
    //         attributes: ['user_id', 'email', 'nickname', 'role'],
    //       },
    //     ],
    //     where: {
    //       deleted_at: null,
    //     },
    //   }),

    //   await LikeService.getLikes()
    // ])

    // // TODO
    // posts.map((post) => {
    //   const likeList = likes.filter((like) => {
    //     like.post_id === post.post_id
    //   }).map((like) => {
    //     user_id: like.user_id
    //   });
    //   // return { ...post, likes };
    // })

    // return { ...posts, likes }

    /**======================================= */

    const postsAll = await Posts.findAll({
      include: [
        {
          raw: true,
          model: Users,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname', 'role'],
        },
      ],
    });


    const likesAll = await Likes.findAll();

    /* 사용자 정보까지 조회하려면 아래 옵션 추가 */
    /*
    {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
    }
    */

    const postValues = postsAll.map((el) => el.get({ plain: true }));
    const likesValues = likesAll.map((el) => el.get({ plain: true }));

    return postValues.map((post) => {
      const likes = likesValues
        .filter((like) => like.post_id === post.post_id)
        .map((like) => ({ user_id: like.user_id }));
      return { ...post, likes };
    });
  },


    // 이렇게 하면 controller에서 Promise { <pending> } 으로 출력됨.
    // return posts.map(async (post) => {
    //   const likesCnt = await LikeService.searchLikesCnt(post.post_id);
    //   post['likes'] = likesCnt ? likesCnt : 0;

    //   return { ...post, likes: likesCnt }
    // })
    /**
    const likesValue = await Likes.findAll({ raw: true });
    return posts.map((post) => {
      const likes = likesValue.filter(
        (like) => like.post_id === post.post_id
      )

      return { ...post, likes: likes.length }
    })
 */
  // },

  // 게시글 추가
  addPost: async (content, image_url, user_id) => {
    try {
      if (!content || !image_url || !user_id) {
        return res.status(400).json({
          data: {
            ok: false,
            message: '내용을 입력하세요.',
          },
        });
      }

      Posts.create({
        content,
        image_url,
        user_id,
      });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  // 특정 게시물 가져오기
  findPostById: async (post_id) => {
    const [posts, likes] = await Promise.all([
      await Posts.findOne({
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
      }),

      await LikeService.getLikesById(post_id)
    ]);
    return { ...posts, likes };
  },

  // 게시글 수정
  updatePost: async (post_id, content) => {
    await Posts.update(
      {
        content,
      },
      {
        where: {
          post_id,
        },
      }
    );
  },

  // 게시글 삭제
  deletePost: async (post_id) => {
    await Posts.update(
      {
        deleted_at: new Date(),
      },
      {
        where: { post_id },
      }
    );
    return;
  },
};
