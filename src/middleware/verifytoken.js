const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { Users } = require('../models');

const verifiedToken = (req, res, next) => {
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

    Users.findOne({ where: { email } }).then((user) => {
      res.locals.user = user.dataValues;
      next();
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }

};

module.exports = { verifiedToken };
