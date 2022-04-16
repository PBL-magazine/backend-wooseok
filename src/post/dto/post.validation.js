'use strict';

const postValidation = {
  Content: (req, res, next) => {
    console.log(res.body);
    const { content } = req.body;


    if (!content) {
      return res.status(400).send({
        ok: false,
        message: '게시물의 내용을 입력하세요.',
      });
    }

    next();
  },

  Image: (req, res, next) => {
    upload(req, res, err => {
      if (err) {
        return res.json({ success: false, err })
      }
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename 
      })
    })

    next();
  }
};

module.exports = postValidation;