# Moa-data

### 개인 보고서

----------

> 역할

<img width="569" alt="스크린샷 2022-06-04 19 46 47" src="https://user-images.githubusercontent.com/87627359/171995927-48950daf-6770-496d-bf40-e5e3dea69f79.png">


회원 검색창에서 `로그인 아이디, 회원 번호, 조회 기간` 을 props로 데이터 반환 함수에 넘기면, 해당 조건을 충족하는 유저 객체가 담긴 배열이 온다.

나는 배열을 가지고, 렌더링 해주면 된다.

현재 **상세란이 비어보이기 때문에 팀에서 임의로**

`nickname, 생년월일, 성별` 을 추가하기로 했다.

----------

### 어떤 디자인을 사용할지 생각해보자.

일단 색상은 정해졌다.

<img width="168" alt="스크린샷 2022-06-04 19 51 51" src="https://user-images.githubusercontent.com/87627359/171995943-ca292a57-c65f-4b65-8f3c-4248198abda6.png">

사람인 색상 #4876EF

`전체 총 5 명의 회원이 검색되었습니다.` 라는 문구에서 ‘5’도 사람인 색상을 넣어 통일감을 줘야겠다.

Pagination을 구현할 때 버튼 색상도 마찬가지로 구현해줘야 겠다.

> 팀에서 이런 식으로 해보자고 정한 디자인. 역시 팀원의 선택을 따르는 게 맘이 편하구나. (나는 스타일 감각이 좀 부족한 거 같다. 자주 좋은 디자인을 염탐하는 수밖에..)

데이터 가공에 시간이 좀 걸린다고 하시니, 일단 더미데이터를 생성해서 작업해보도록 하자.

----------

### 데이터 가공은 내가 해야하는 거구나.

데이터 가공을 맡으신 인종님이 내 데이터까지 가공해주시는 줄 알았다.

근데 자세히보니 Chart 데이터 가공이라고 써져있었다. 그런 줄도 모르고 인종님이 내꺼 언제 해주시나~ 하고 무작정 기다렸다.

꼼꼼히 읽지 않은 내 잘못이었고, 당장 작업을 시작했다.

이게 검색에 쓰일 검색 창이었는데, 뭔가 이상했다.

<img width="635" alt="스크린샷 2022-06-04 19 52 42" src="https://user-images.githubusercontent.com/87627359/171995971-0bb64444-4bbe-4957-84dc-10af0d92fd81.png">

> 로그인ID 도 겹치치 않을 거고.. 회원번호도 겹치지 않는 상수 아닌가? 두개가 왜 같이있지?

이 주제로 팀원들과 얘기를 한 결과, 로그인 아이디와 회원번호는 드롭다운 아이템으로 넣어주고, 둘 중 하나를 골라 사용할 수 있게 만들었다.

### 결과 목록을 반환하는 함수는 어떻게 만들까?

```js
interface IProps {
  id: string | undefined
  number: number | undefined
  startDate: number
  endDate: number
}

export const getMemberInfo = (props: IProps) => {
  if (props.id && !props.number) return filterUserWithIdAndDate(props.id, props.startDate, props.endDate)
  if (props.number && !props.id) return filterUserWithNumberAndDate(props.number, props.startDate, props.endDate)
  if (!props.number && !props.id) return filterUserWithOnlyDate(props.startDate, props.endDate)

  return []
}
```

지금 검색창으로부터 최대 3개, 최소 2개의 파라미터를 함수가 받게 된다. (닉네임 검색과 유저 번호 검색 중 택 1)

props는 id?, number?, startDate, endDate다.

id가 있을 땐 , `filterUserWithIdAndDate` 함수를 실행시키고,

number가 있을 땐 `filterUserWithNumberAndDate` 함수를 실행시켜준다.

```js
//함수는 이런식이다.

export const filterUserWithNumberAndDate = (number: number, startDate: number, endDate: number) => {
  const numberIncludeUsers = users.filter((user) => user.member_seq.toString().includes(number.toString()))

  const includeDateArray = dateIncludeUsersArray(users, startDate, endDate)

  const result = numberIncludeUsers.filter((ids) => includeDateArray.find((date) => ids.member_seq === date.member_seq))

  return result
}
```

결과적으론 각 함수가 두개의 배열을 반환하고, 배열을 비교해 동일한 객체를 반환한다.

예를 들어서 id: member, startDate가 20220310, endDate가 20200410으로 온다면,

(startDate와 endDate는 `YYYY-MM-DD HH:MM:SS` 포맷에서 일일히 잘라 숫자형으로 변환시켰다.)

1.  배열의 객체중 유저의 아이디가 ‘member’를 includes하는 모든 객체 추출
2.  20220310 ≤ registerDate ≤ 20200410을 만족하는 모든 객체 추출
3.  각각의 객체가 담긴 배열 비교 & 동일 한 객체가 있을 시 추출
4.  해당 객체(들) 반환

### 아니, 그럼 기간이 전체일 땐 어떡해요?

이게 실제 서비스였으면 서비스 시작일이 있을 거고,

서비스 시작일 ~ 오늘까지가입 한 모든 데이터를 반환하면 된다.

----------

### 생각해보니까, 하나 깜빡한게 있었다, id, number 매개변수가 둘 다 안오면?

```js
export const filterUserWithOnlyDate = (startDate: number, endDate: number) => {
  const includeDateArray = dateIncludeUsersArray(users, startDate, endDate)

  return includeDateArray
}
```

바로 함수 하나를 만들었다. 어떤 경우에도 시작일과 종료일은 오기때문에, 이 조건에 맞는 객체만 배열에 담아 반환한다.

### 퍼지 문자열을 구현해보자

https://github.com/bluewings/korean-regexp

나는 일단 이 라이브러리를 굉장히 좋아한다. Lodash에도 escapeRegexp라는 문법? 이 있는 듯한데, lodash 라이브러리가 좀 무겁단 소리가 많아서 웬만하면 이 라이브러리를 사용하는 편이다.

```jsx
export const filterUserWithIdAndDate = (id: string, startDate: number, endDate: number) => {
  const inputRegex = getRegExp(id, {
    fuzzy: true,
  })

  const idIncludeUsers = users.filter((user) => user.user_id.match(inputRegex))

  const includeDateArray = dateIncludeUsersArray(users, startDate, endDate)

  const result = idIncludeUsers.filter((ids) => includeDateArray.find((date) => ids.member_seq === date.member_seq))

  return result
}

```

뭐 크게 어려운 건 없다. 퍼지 검색만 True로 해주면, 알아서 정규식을 생성해주고, `Array.filter()` 함수로 user_id가 정규식을 통과하는 것만 배열로 만들어줬다. 되게 어려운 작업인 듯 쉬웠다.

이제 내가 맡은 역할은 끝이다. 이제 지혁님이 만드신 리코일과 연결만 하면 된다.
