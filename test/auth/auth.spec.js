const { signInValidator } = require('../../src/auth/dto/auth.validation')

describe('로그인 테스트', () => {
  test('로그인 형식 테스트 true', async () => {
    const req = {
      body: {
        email: 'moto4321@naver.com',
        password: 'aaaa1111'
      }    
    };
    const res = {};
    const next = jest.fn();

    await signInValidator(req, res, next);
    expect(next).toBeCalledTimes(1);
  })

  test('로그인 형식 테스트 false', async () => {
    const req = {
      body: {
        email: 'moto4321naver.com',
        password: 'aaaa1111'
      }    
    };
    const res = { //? 테스트할 함수안에 들어있는 실행 로직들은 꼼꼼하게 하나하나 선언해주는게 좋다. (에러방지) 
      status: jest.fn(() => res), // 체이닝 하니까 자기자신을 리턴 
      json: jest.fn(), 
    };
    const next = jest.fn();
    

    await signInValidator(req, res, next);
    expect(next).toBeCalledTimes(0);
  
  })

});
