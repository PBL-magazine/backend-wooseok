const app = require('../../src/app');
const request = require('supertest');
const path = require('path');
const { setupDatabase } = require('../fixtures/db');


describe('게시글 라우트', () => {
  // 게시글 조회 테스트
  test('GET /api/posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toEqual(200);

    // return request(app)
    //   .get('/todos')
    //   .expect('Content-Type', /json/)
    //   .expect(200)
    //   .then((response) => {
    //     expect(response.body.rows).toEqual(
    //       expect.arrayContaining([
    //         expect.objectContaining({
    //           post_id: expect.any(Number),
    //           content: expect.any(String),
    //           image: expect.any(String),
    //           created_at: expect.any(Date),
    //           updated_at: expect.any(Date),
    //           user: expect.objectContaining({
    //             user_id: expect.any(Number),
    //             email: expect.any(String),
    //             nickname: expect.any(String)
    //           }),
    //           likes: expect.arrayContaining([
    //             expect.objectContaining({
    //               user_id: expect.any(Number)
    //             })
    //           ])
    //         }),
    //       ])
    //     )
    //   })

  });

  // 게스글 생성 테스트
  test('POST /api/posts', async () => {
    const image = path.resolve(__dirname, '../fixtures/log.jpeg')


    console.log('여기에요!!!!');
    console.log(image)
    
    await request(app)
      .post('/api/posts')
      .set('authorization', 'Bearer ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vdG80MzIxQG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoia2l3b29zZW9rIiwiaWF0IjoxNjUwNTkxODY5fQ.zvVyku_LzVtRAVP2JrTkCPr65N84c8ia-kAWfxNZEBk')
      .set('Content-Type', 'multipart/form-data')
      .attach('image', image)
      .expect(201)

      
    // const response = await supertest(app).post('/api/posts');
    // expect(response.status).toEqual(200)


  })
});