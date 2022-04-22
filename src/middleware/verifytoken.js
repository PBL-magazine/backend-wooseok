const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { Users } = require('../models');

const verifiedToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      ok: false,
      message: '로그인 후 사용해 주세요'
    })
  }
  const [tokenType, tokenValue] = authorization.split(' ');
  if (tokenType !== 'Bearer') {
    return res.status(401).json({
      message: '로그인 후 사용해 주세요.',
    });
  }

  try {
    const { email } = jwt.verify(tokenValue, SECRET);
    console.log('여기는 나오겠지')
    await Users.findOne({ where: { email } }).then((user) => {
      res.locals.user = user.dataValues;
      console.log('next 직전')
      next();
    });
  } catch (error) {
    console.log('여기가 실행되면 안되는데')
    res.json({
      message: error,
    });
  }

};

module.exports = { verifiedToken };
