const app = require('../../src/app');
const request = require('supertest');
const { setupCommentDatabase, setupPostDatabase } = require('../fixtures/db');
const { Users } = require('../../src/models')
const { sequelize } = require('../../src/models')
const jwt = require('jsonwebtoken')

beforeAll(setupPostDatabase)
beforeAll(setupCommentDatabase)

describe('회원관리 API test', () => {

  // 특정 게시물의 댓글 전체 조회
  test('GET /api/posts/1/comments', async () => {
    return request(app)
      .get('/api/posts/1/comments')
      .set('authorization', 'Bearer ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vdG80MzIxQG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoia2l3b29zZW9rIiwiaWF0IjoxNjUwNTkxODY5fQ.zvVyku_LzVtRAVP2JrTkCPr65N84c8ia-kAWfxNZEBk')
      .expect(200)    
  })


  // 댓글 생성
  // test('POST /api/users/signin', async () => {
  //   return request(app)
  //     .post('/api/users/signin')
  //     .send({
  //       email: 'test@example.com',
  //       password: 'q1w2e3r4'
  //     }).expect(200)
  // })

});
