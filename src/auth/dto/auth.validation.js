const joi = require('joi');

const authValidation = {
  signUpSchema: joi.object({
    email: joi.string().email().required().messages({
      'string.email': '이메일 형식을 확인하세요.',
      'string.empty': '이메일을 입력해 주세요.',
    }),
    nickname: joi.string().min(3).max(30).required().messages({
      'string.base': '닉네임 형식을 확인해 주세요.',
      'string.empty': '닉네임을 입력해 주세요.',
    }),
    password: joi.string().min(4).max(30).required().messages({
      'string.base': '비밀번호 형식을 확인해주세요.',
      'string.empty': '비밀번호를 입력해 주세요.',
    }),
    confirmPassword: joi.string().min(4).max(30).required().messages({
      'string.base': '비밀번호 형식을 확인해주세요.',
      'string.empty': '비밀번호를 입력해 주세요.',
    }),
  }),

  signInSchema: joi.object({
    email: joi.string().email().required().messages({
      'string.email': '이메일 형식을 확인하세요.',
      'string.empty': '이메일을 입력해 주세요.',
    }),
    password: joi.string().min(4).max(30).required().messages({
      'string.base': '비밀번호 형식을 확인해주세요.',
      'string.empty': '비밀번호를 입력해 주세요.',
    }),
  }),
};

const signUpValidator = async (req, res, next) => {
  try {
    const { body } = req;
    await authValidation.signUpSchema.validateAsync(body);

    next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.details[0].message,
    });
  }
};

const signInValidator = async (req, res, next) => {
  try {
    const { body } = req;
    await authValidation.signInSchema.validateAsync(body);

    next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.details[0].message,
    });
  }
};

module.exports = { signUpValidator, signInValidator };
