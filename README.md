# MoA data
## 배포
주소: \
ID: moatest1\
PW: test

## 참여 인원

 - 김영만 [💻 Github](https://github.com/sksn12)
 - 김학률 (팀장) [💻 Github](https://github.com/markyul)
 - 노서현 [💻 Github](https://github.com/Seohyun-Roh)
 - 마지혁 [💻 Github](https://github.com/majih93)
 - 유인종 [💻 Github](https://github.com/in3166)
 - 이강윤 [💻 Github](https://github.com/rkddbs1031)
 - 이지훈 [💻 Github](https://github.com/jihun1233)
 - 이치호 [💻 Github](https://github.com/usernamechiho)
 - 조혜빈 [💻 Github](https://github.com/hyebin829)
 - 지수근 [💻 Github](https://github.com/jsg0629)

## Techs

React: `"^18.1.0"` <br/>
Typescript": `"^4.4.2"` <br/>
React-router-dom: `"6"` <br/>
Sass: `"^1.51.0"` <br/>
Sass-loader: `"^12.6.0"` <br/>
Recoil: `"^0.7.3-alpha.2"`<br/>
Store: `"^2.0.12"` <br/>
Classnames: `"^2.3.1"` <br/>
Date-fns: `"^2.28.0"` <br/>
Dayjs: `"^1.11.2"` <br/>
Korean-regexp:`"^1.0.9"` <br/>

**To work as one,**

Eslint: `"^8.14.0"` <br/>
Prettier: `"^2.6.2"` <br/>
Eslint-config-airbnb: `"^19.0.4"` <br/>
Eslint-config-prettier: `"^8.5.0"` <br/>


## 개발 과정
<img width="772" alt="원본" src="https://user-images.githubusercontent.com/87627359/171991730-5d0f94dc-90f1-4029-9c5c-4ea5e2775fbf.png">


## 폴더 구조
```
├── assets
│   ├── jsons
│   │   ├── heartrate
│   │   ├── steprate
│   │   └── user
│   └── svgs
├── hooks
├── routes
│   ├── Home
│   ├── Layout
│   │   ├── Header
│   │   │   └── Breadcrumb
│   │   └── Sidebar
│   ├── Login
│   ├── NotFoundPage
│   ├── UserInfo
│   │   └── Charts
│   ├── UserManage
│   │   ├── Result
│   │   └── Search
│   └── _components
│       ├── Button
│       ├── DatePickerModal
│       ├── DropDown
│       └── SearchDateRange
├── services
├── states
├── styles
│   ├── base
│   ├── constants
│   └── mixins
├── types
└── utils
```

## 기능
### 로그인
![모아데이터 로그인](https://user-images.githubusercontent.com/87627359/171990960-e7475650-d758-4e29-9b31-2cd06fa2e419.gif)

- 로그인 페이지입니다.
- 입력을 하지 않았을 때, 잘못된 아이디를 입력했을 때 로그인 오류 팝업과 플로팅 메세지가 나타납니다.
- 로그인 정보를 기억하는 `Remember Me` 체크박스를 구현했습니다.

### 메인페이지
![모아데이터 메인페이지](https://user-images.githubusercontent.com/87627359/171991192-a6f8e295-0d7b-4a72-a5c1-0bda6a836d85.gif)

- 상단 네비게이션 바, 반응형 사이드바를 확인할 수 있습니다.
- 상단 네비게이션 바를 이용해 로그아웃이 가능합니다.

### 회원 관리 페이지
![모아데이터 회원관리](https://user-images.githubusercontent.com/87627359/171991269-a16ca37e-1d5b-4298-8093-c7a9a6086f2a.gif)

- 회원을 조건에 맞춰 검색할 수 있습니다.
- ID검색은 퍼지 검색이 가능합니다.
- 관리 버튼을 누르면 회원 정보 상세 페이지로 이동합니다.

### 회원 정보 페이지
![모아데이터 회원 정보 페이지](https://user-images.githubusercontent.com/87627359/171991440-43667168-b8bd-408e-88f5-507997df69fa.gif)

- 해당 회원의 정보를 확인할 수 있습니다.
- 기간에 따른 심박수, 걸음수를 그래프로 나타냅니다.

![모아데이터 회원 관리 반응형](https://user-images.githubusercontent.com/87627359/171991520-e33cab2e-0501-4622-bbc1-d18aa1bff4ac.gif)

- 반응형 웹으로 그래프가 깨지지 않게 설계했습니다.
