const app = require('../../src/app');
const request = require('supertest');
const path = require('path');
const { setupPostDatabase, setupUserDatabase } = require('../fixtures/db');
const { Posts } = require('../../src/models')
const { sequelize } = require("../../src/models");

beforeAll(setupUserDatabase)
beforeAll(setupPostDatabase)

describe('게시글 API test', () => {
  // 게시글 조회 테스트
  test('GET /api/posts', async () => {
    return request(app)
      .get('/api/posts')
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.rows).toEqual(
          expect.arrayContaining([
            // expect.objectContaining({
              // post_id: expect.any(Number),
              // content: expect.any(String),
              // image_url: expect.any(String),
              // deleted_at: null,
              // created_at: expect.any(String),
              // updated_at: expect.any(String),
              // user: expect.objectContaining({
              //   user_id: expect.any(Number),
              //   email: expect.any(String),
              //   nickname: expect.any(String),
              //   role: expect.any(Number)
              // }),
              // likes: expect.arrayContaining([
              //   expect.objectContaining({
              //     user_id: expect.any(Number)
              //   })
              // ])
            // }),
          ])
        )
      })
  });

  // 게스글 생성 테스트
  // test('POST /api/posts', async () => {
  //   const image = path.resolve(__dirname, '../fixtures/log.jpeg')
  //   const content = 'test contttt'

  //   console.log('여기에요!!!!');
  //   console.log(image)
    
  //   await request(app)
  //     .post('/api/posts')
  //     .set('authorization', 'Bearer ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vdG80MzIxQG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoia2l3b29zZW9rIiwiaWF0IjoxNjUwNTkxODY5fQ.zvVyku_LzVtRAVP2JrTkCPr65N84c8ia-kAWfxNZEBk')
  //     .attach('image', image)
  //     .expect(201)

  // })


  // 게시글 삭제 테스트
  test('DELETE /api/posts/:post_id', async () => {
    return request(app)
      .delete('/api/posts/1')
      .set('authorization', 'Bearer ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vdG80MzIxQG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoia2l3b29zZW9rIiwiaWF0IjoxNjUwNTkxODY5fQ.zvVyku_LzVtRAVP2JrTkCPr65N84c8ia-kAWfxNZEBk')
      .expect(200)
  })

});