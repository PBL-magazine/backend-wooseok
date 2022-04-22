const app = require('../../src/app');
const request = require('supertest');
const { setupUserDatabase } = require('../fixtures/db');
const { Users } = require('../../src/models')
const { sequelize } = require('../../src/models')

beforeAll(setupUserDatabase)

// beforeAll(async () => {
//   await sequelize.sync();
// });

describe('회원관리 API test', () => {

  // 회원가입 테스트
  test('POST /api/users/signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        nickname: 'nicknick',
        password: 'testpass',
        confirmPassword: 'testpass',
      }).expect(201)
  })

  // 로그인
  test('POST /api/users/signin', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@example.com',
        password: 'q1w2e3r4'
      }).expect(200)
  })

});
