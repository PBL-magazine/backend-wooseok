# NodeJS 2주차 과제
<hr />

## 요구 기능
### 게시글 관련
1. 전체 게시물 조회
2. 게시물 생성
3. 특정 게시물 조회
4. 특정 게시물 수정
5. 특정 게시물 삭제
6. 특정 게시물 좋아요 상태 변경
7. 특정 게시물 전체 댓글 조회
8. 특정 게시물 댓글 생성
9. 특정 게시물 댓글 수정
10. 특정 게시물 댓글 삭제

### 인증 관련
1. 유저 회원가입
2. 유저 로그인
<hr />

## ERD 설계
![설계도](./assets/NodeJS-Week2%20(3).png)

## API 설계

분류|기능|URL|Method|
---|---|---|---|
게시글|게시글 전체 조회|/api/posts|GET|
게시글|게시글 생성|/api/posts|POST|
게시글|특정 게시글 조회|/api/posts/:post_id|GET|
게시글|특정 게시글 수정|/api/posts/:post_id|PATCH|
게시글|특정 게시글 삭제|/api/posts/:post_id|DELETE|
게시글|특정 게시글 좋아요 변경|/api/posts/:post_id/like|PATCH|
댓글|특정 게시글 전체 댓글 조회|/api/posts/:post_id/comments|GET|
댓글|특정 게시글 댓글 생성|/api/posts/:post_id/comments|POST|
댓글|특정 게시글 댓글 수정|/api/posts/:post_id/comments/:comment_id|PATCH|
댓글|특정 게시글 댓글 삭제|/api/posts/:post_id/comments/:comments_id|DELETE|
회원관리|회원가입|/api/users/signup|POST|
회원관리| 로그인 |/api/users/signin|POST|
