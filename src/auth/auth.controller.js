const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthService = require('../auth/auth.service');
const SECRET = process.env.SECRET;
const { verifiedToken } = require('../middleware/verifytoken')
const { signUpValidator, signInValidator } = require('./dto/auth.validation');

// 회원가입
router.post('/signup', signUpValidator, async (req, res) => {
  try {
    // const { email, nickname, password, confirmPassword } = req.body;
    const { email, nickname, password, confirmPassword } = req.body;

    // if (password !== confirmPassword) {
    //   return res.status(400).json({
    //     ok: false,
    //     message: '두 패스워드가 다릅니다.'
    //   })
    // }

    if (password.includes(nickname)) {
      return res.status(400).json({
        ok: false,
        message: '비밀번호에 닉네임이 포함되어있으면 안됩니다'
      })
    }

    const existUser = await AuthService.findByEmail(email);
    if (existUser) {
      return res.status(409).json({
        ok: false,
        message: '이미 존재하는 이메일 계정입니다.',
      });
    }

    bcrypt.hash(password, 10).then((hash) => {
      AuthService.createUser(email, nickname, hash);
    });

    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: '입력 형식을 확인하세요',
    });
  }
});

// 로그인
router.post('/signin', signInValidator, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthService.findByEmail(email);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: '존재하지 않는 이메일 계정입니다.',
      });
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.status(401).json({
          ok: false,
          message: '이메일 또는 비밀번호를 확인하세요.',
        });
      }

      const accessToken = jwt.sign(
        {
          email: user.email,
          nickname: user.nickname,
        },
        SECRET
      );

      res.cookie('token', accessToken);
      return res.status(200).json({
        ok: true,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
});

// 유저 정보 확인
router.get('/auth', verifiedToken, async (req, res) => {
  const { user } = res.locals;
  return res.status(200).json({
    ok: true,
    user
  })
});

module.exports = router;
