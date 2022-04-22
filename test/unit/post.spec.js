const PostVlidation = require('../../src/post/dto/post.validation');

describe('사용자 매칭 모듈', () => {
  test('사용자가 일치하므로 next()가 실행돼야 함', async () => {
    const req = {
      params: {
        post_id: 7
      }    
    };
    const res = {
      locals: {
        user: {
          user_id: 7
        }
      }
    };
    const next = jest.fn();

    await PostVlidation.WriterMatch(req, res, next)
    expect(next).toBeCalledTimes(1);
  })



})


