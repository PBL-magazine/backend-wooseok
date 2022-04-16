const express = require('express');
const router = express.Router();
const { verifiedToken } = require('../middleware/verifytoken')
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const AuthService = require('../auth/auth.service');
const { hash } = require('bcrypt');
const { header } = require('express/lib/request');
const SECRET = process.env.SECRET

const joiSchema = joi.object({
  email: joi.string().email().required(),
  nickname: joi.string().min(3).max(30).required(),
  password: joi.string().min(4).max(30).required()
});

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { email, nickname, password } = await joiSchema.validateAsync(req.body);

    const existUser = await AuthService.findByEmail(email);
    if (existUser) {
      return res.status(409).json({
        ok: false,
        message: "이미 존재하는 이메일 계정입니다."
      })
    }

    bcrypt.hash(password, 10).then((hash) => {
      AuthService.createUser(email, nickname, hash);
    })

    res.status(201).json({
      ok: true
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      message: '입력 형식을 확인하세요'
    })
  }
})


router.post('/signin', async (req, res) => {
  const { email, password } = await joiSchema.validateAsync(req.body);
  
  const user = await AuthService.findByEmail(email);

  if (!user) {
    return res.status(404).json({
      ok: false,
      message: "존재하지 않는 이메일 계정입니다."
    })
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.status(401).json({
        ok: false,
        message: "이메일 또는 비밀번호를 확인하세요."
      })
    }

    const accessToken = jwt.sign({
      email: user.email,
      nickname: user.nickname,
    }, SECRET)

    res.status(200).cookie({
      token: accessToken
    })
  })
})



module.exports = router;