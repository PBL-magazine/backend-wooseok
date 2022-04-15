const jwt = require('jsonwebtoken');

const virifiedToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!accessToken) {
    return res.json({
      error: "로그인 후 사용해 주세요."
    })
  }

  try {
    const validToken = jwt.verify()
  } catch (error) {
    res.json({
      error: error
    })
  }

}

module.exports = { verifiedToken }