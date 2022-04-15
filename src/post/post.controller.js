const express = require('express');
const PostService = require('./post.service');
const router = express.Router();
const { verifiedToken } = require('../middleware/verifytoken')
const multer = require('multer');

// const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

//=================================================
// multer npm
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const upload = multer({ storage: storage }).single("file")

const uploader = multer({ dest: 'uploads/' })

//=================================================


// 전체 게시글 가져오기
router.get('/', async (req, res) => {
  const results = await PostService.getAllPost();
  // res.json({ posts })
  res.status(200).json({
    ok: true,
    rows: results
  })
});

// 게시글 추가
router.post('/', verifiedToken, uploader.single('image'), async (req, res, next) => {
  const { content, userId } = req.body;

  const imagePath = req.file ? `/image/${req.file.filename}` : null;

  const response = await PostService.addPost(content, imagePath, userId);

  if (response.success) {
    return res.status(201).json({
      ok: true
    });
  }
  return res.status(500).json({
    status: '500 Internal Server Error'
  })
})

// 특정 게시물 조회
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const post = await PostService.findPostById(post_id);
  res.status(200).json({
    ok: true,
    row: post
  })
})

// 특정 게시물 수정
router.patch('/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const { content, image } = req.body;

  if (!content || !image) {
    res.json({

    })
  }



})



module.exports = router;