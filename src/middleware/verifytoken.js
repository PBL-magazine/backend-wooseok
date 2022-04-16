const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { Users } = require('../models');

const verifiedToken = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(' ');

  console.log('여기가 어디죠?');

  console.log(tokenType)
  console.log(tokenValue)

  if (tokenType !== 'Bearer') {
    return res.status(401).json({
      error: "로그인 후 사용해 주세요."
    })
  }

  try {
    const { email } = jwt.verify(tokenValue, SECRET);


    Users.findOne({ where: { email }}).then((user) => {
      res.locals.user = user.dataValues;

      next();
    })

  } catch (error) {
    res.json({
      error: error
    })
  }
}

module.exports = { verifiedToken }