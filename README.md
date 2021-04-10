# My blog ver2

항해99 주특기 심화 챕터에서 진행한

Spring Boot 기반 CRUD 기능과 로그인 기능이 포함된 나만의 블로그 만들기 미니 프로젝트 입니다.

## API 설계

| 기능             | Method | URL                     | 반환          |
| ---------------- | ------ | ----------------------- | ------------- |
| 전체 게시글 조회 | GET    | /api/posts              | List<Post>    |
| 특정 게시글 조회 | GET    | /api/detail/{id}        |  Post   |
| 게시글 작성      | POST   | /api/posts              | Post          |
| 게시글 수정      | PUT    | /api/posts/{id}         | id            |
| 게시글 삭제      | DELETE | /api/posts/{id}         | id            |
| 로그인           | POST   | /user/login             |               |
| 회원가입         | POST   | /user/signup             | List(User)    |
| 댓글 조회        | GET    | /api/comments/{post_id} | List<Comment> |
| 댓글 작성        | POST   | /api/comments           | Comment       |
| 댓글 수정        | PUT    | /api/comments/{id}      | id            |
| 댓글 삭제        | DELETE | /api/comments/{id}      | id            |

  

## 와이어 프레임

### 메인 페이지

![image](https://user-images.githubusercontent.com/53491653/112813857-a23a2080-90b9-11eb-999c-13e47744d528.png)

* 자신이 작성한 글만 수정 및 삭제 가능

### 게시글 작성 페이지

![image](https://user-images.githubusercontent.com/53491653/113243620-515f3d80-92ee-11eb-8157-c8a5ac13e114.png)

### 게시글 조회 페이지

![image](https://user-images.githubusercontent.com/53491653/113243664-63d97700-92ee-11eb-8142-a5c48e30c412.png)

* 로그인 한 사용자만 댓글 작성 가능
* 로그인 하지 않은 사용자가 댓글 작성 버튼을 누르면 로그인 페이지로 이동

### 로그인 페이지

![image](https://user-images.githubusercontent.com/53491653/112814264-1379d380-90ba-11eb-892a-7b4df8c1ec00.png)

### 회원가입 페이지

![image](https://user-images.githubusercontent.com/53491653/113243816-abf89980-92ee-11eb-88a1-4769749cd47c.png)



## 3계층 설계

1. Controller

* PostRestController : 게시글 관련 컨트롤러
* HomeController : 페이지 간 이동 컨트롤러
* UserController : 인증 및 인가처리 컨트롤러
* CommentController : 댓글 관련 컨트롤러

2. Service

* PostService : 게시글 수정
* UserService : 인증 및 인가처리
* CommentService : 댓글 수정

3.1. Model
모델과 dto, Repository 분할

* Post : 게시글 테이블 - 제목, 작성자명, 작성 날짜
* User : 유저 테이블 - 아이디, 패스워드, 이메일, 역할, 카카오아이디
* Comment : 댓글 테이블 - 작성자명, 작성날짜, 내용

3.2. Repository

* PostRepository : 게시글 DB 접근
* UserRepository : 회원정보 DB 접근
* CommentRepository : 댓글 DB 접근

3.3. Dto

* PostRequestDto : 게시글 수정 / 등록
* SignupRequestDto : 회원가입
* CommentReqeustDto : 댓글 수정 / 등록


## 구조

인증과 인가가 끼게 되어 Spring Security 추가
![image](https://user-images.githubusercontent.com/53491653/112817336-483b5a00-90bd-11eb-8dd3-bfb2be91c372.png)


## 결과 페이지 첨부
### 메인 페이지
![image](https://user-images.githubusercontent.com/53491653/113321494-9f0b9280-934e-11eb-9f75-670e32a0069a.png)

### 게시글 작성 페이지
![image](https://user-images.githubusercontent.com/53491653/113321545-a92d9100-934e-11eb-8e9d-a2594ba5ee06.png)

### 게시글 조회 페이지
![image](https://user-images.githubusercontent.com/53491653/113321636-c19dab80-934e-11eb-917a-badcc3cb9274.png)

### 로그인 페이지
![image](https://user-images.githubusercontent.com/53491653/113321366-7c797980-934e-11eb-8bcc-9e84d5b7cb69.png)

### 회원가입 페이지
![image](https://user-images.githubusercontent.com/53491653/114260586-d6de9e00-9a10-11eb-96a3-f2a8d7e651cf.png)

## todo list

* 프론트 - show & hide
* 삭제 시 삭제 확인 메시지 띄우기
* 테스트 코드 작성
