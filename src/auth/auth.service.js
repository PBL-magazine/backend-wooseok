const { Users } = require('../models');

module.exports = AuthService = {
  // 해당 이메일 찾기
  findByEmail: async (email) => {
    return await Users.findOne({ where: { email } });
  },

  // 유저 생성
  createUser: async (email, nickname, hash) => {
    Users.create({
      email,
      nickname,
      password: hash,
    });

    return;
  },
};
