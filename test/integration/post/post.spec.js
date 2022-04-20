const app = require('../../../src/app');
const supertest = require('supertest');

describe('게시글 라우트', () => {
  test('GET /api/posts', async () => {
    const response = await supertest(app).get('/api/posts');
    expect(response.status).toEqual(200);
  });

  test('POST /api/posts', async () => {}
    
  )
});