# In Hanghae99 my blog

항해99 주특기 기본 챕터에서 진행한

Spring Boot 기반 CRUD 기능이 포함된 로그인 기능이 없는 나만의 블로그 만들기 미니 프로젝트 입니다.

## API 설계

| 기능             | Method | URL             | 반환       |
| ---------------- | ------ | --------------- | ---------- |
| 전체 게시글 조회 | GET    | /api/posts      | List<Post> |
| 특정 게시글 조회 |        |                 |            |
| 게시글 작성      | POST   | /api/posts      | Post       |
| 게시글 수정      | PUT    | /api/posts/{id} | id         |
| 게시글 삭제      | DELETE | /api/posts/{id} | id         |

## 와이어 프레임
### 메인 페이지
![image](https://user-images.githubusercontent.com/53491653/111947356-a5b13300-8b20-11eb-9f31-419ed4062958.png)
### 작성 페이지(modal)
![image](https://user-images.githubusercontent.com/53491653/111947393-bc578a00-8b20-11eb-95ca-eb9a29304623.png)
### 특정 게시글 조회 페이지(modal)
![image](https://user-images.githubusercontent.com/53491653/111947420-cbd6d300-8b20-11eb-99a0-9c164ceccd23.png)


## 3계층 설계

1. Controller

- PostRestController : 게시글 관련 컨트롤러

2. Service

- PostService: 게시글 수정

3. Repository

- Post : 게시글 테이블 - 제목, 작성자명, 작성 날짜
- PostRepository : 게시글 조회, 저장
- PostRequestDto : 게시글 수정 / 등록




## 수행

커밋 내역을 보시면 프로젝트 수행 순서를 알 수 있습니다.

위에서 설계한 내용을 토대로 구조를 만들고

서버사이드에서는 Timestamped - Models - Controller & Service 순으로 작업 했고

이후 html, css 작업으로 기본 구조를 와이어프레임과 비슷하게 만들고,

ajax를 통해 서버와 클라이언트를 mapping 했습니다.



### Bootstrap - modal

추가로 해당 게시글의 조회 기능이 모달로 어떻게 동작하는지 조금만 알아보면 글쓰기 버튼을 누르면 작성 모달창이 뜨게됩니다. 

작성을 하게되면 addHTML() 함수를 통해 포스트들이 붙게 되는데, 카드들이 붙을 때 마지막에 작성한 id를 갖고 있기 때문에 해당 게시글의 조회 기능을 또 모달로 부르는데 어려움이 있었습니다.

→ 의외로 해결 방법은 간단했는데 모달 버튼이 되는 부분, 모달을 부르는 부분에서  id 값을 고정된 값이 아닌 바뀌는 값으로 넣어주면 해결됩니다. (여기서는 게시물의 id를 사용했습니다.)

#### 원래 서식

모달 버튼이 되는 부분

```jsx
data-target = "#modal-post"
```

모달창 부분

```jsx
id="modal-post"
```

#### 변경

모달 버튼이 되는 부분

```jsx
data-target="#${id}
```

모달창 부분

```jsx
id="${id}"
```



## 결과 페이지 첨부

### 메인 페이지



여기서 게시글 우측 하단에 있는 연필 모양 아이콘을 누르면 PUT을 수행하게 되고

휴지통 모양 아이콘을 누르면 DELTE를 수행하게 됩니다.

### 작성 페이지(modal)



### 해당 게시글 조회 페이지(modal)



### 수정(Show & hide)

