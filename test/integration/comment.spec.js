const app = require('../../src/app');
const request = require('supertest');
const { setupCommentDatabase, setupPostDatabase, getToken } = require('../fixtures/db');
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
      // .set('authorization', 'Bearer ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vdG80MzIxQG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoia2l3b29zZW9rIiwiaWF0IjoxNjUwNTkxODY5fQ.zvVyku_LzVtRAVP2JrTkCPr65N84c8ia-kAWfxNZEBk')
      .expect(200)    
  })

  let auth = {}
  beforeAll(loginUser(auth))

  // 댓글 작성
  test('POST /api/posts/1/comments', async () => {
    request(app)
      .post('/api/posts/1/comments')
      .set('authorization', 'Bearer ', auth.token)
      .send({
        content: 'create comment'
      })
      .expect(201)
  })

  // 댓글 수정
  test('PATCH /api/posts/1/comments/1', async () => {
    request(app)
      .patch('./api/posts/1/comments/1')
      .set('authorization', 'Bearer ', auth.token)
      .send({
        content: 'updated comment'
      })
      .expect(200)
  })

  // 댓글 삭제
  test('DELETE /api/posts/1/comments/1', async () => {
    request(app)
      .delete('/api/posts/1/comments/1')
      .set('authorization', 'Bearer ', auth.token)
      .expect(200)
  })

});


function loginUser(auth) {
  return function(done) {
      request(app)
          .post('/api/users/signin')
          .send({
            email: 'test@example.com',
            password: 'q1w2e3r4',
          })
          .expect(200)
          .end(onResponse);

      function onResponse(err, res) {
          auth.token = res.body.token;
          return done();
      }
  };
}
