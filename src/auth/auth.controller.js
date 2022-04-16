const express = require('express');
const router = express.Router();
const { verifiedToken } = require('../middleware/verifytoken')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthService = require('../auth/auth.service');
const SECRET = process.env.SECRET
const { authValidation } = require('./dto/auth.validation');

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { email, nickname, password } = await authValidation.signUpSchema.validateAsync(req.body);
   
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

    return res.status(201).json({
      ok: true
    })

  } catch (error) {
    return res.status(400).json({
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

    // return res.status(200).cookie({
    //   token: accessToken
    // })

    return res.status(200).json({
      token: accessToken
    })
  })
})



module.exports = router;