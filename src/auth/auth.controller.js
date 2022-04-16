const express = require('express');
const router = express.Router();
const { verifiedToken } = require('../middleware/verifytoken')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthService = require('../auth/auth.service');
const SECRET = process.env.SECRET
const { authValidation } = require('./auth.validation');

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { email, nickname, password, passwordChk } = await authValidation.signUpSchema.validateAsync(req.body);

    if (password !== passwordChk) {
      return res.status(400).json({
        ok: false,
        message: '비밀번호가 일치하지 않습니다.'
      })
    }

    console.log(email)

    const existUser = await AuthService.findByEmail(email);
    console.log(existUser)
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
  const { email, password } = await authValidation.signInSchema.validateAsync(req.body);
  
  const user = await AuthService.findByEmail(email);

  if (!user) {
    return res.status(404).json({
      ok: false,
      message: "존재하지 않는 이메일 계정입니다."
    })
  }

  console.log(password)
  console.log(user.password)

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.status(401).json({
        ok: false,
        message: "이메일 또는 비밀번호를 확인하세요."
      })
    }

    const accessToken = jwt.sign({
      email: user.email,
      nickname: user.nickname,
    }, SECRET)

    return res.status(200).cookie({
      token: accessToken
    })
  })
})



module.exports = router;