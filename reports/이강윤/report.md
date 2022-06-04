# 과제 개인 수행 보고서

## 역할
1. 전체적인 UI 디자인 및 css
2. 로그인 페이지 디자인 및 css 작업
3. 회원정보 상세페이지 디자인 및 css작업
4. breadcrumb 수정

## 개발 진행
### 로그인 페이지 Design & CSS작업
1. 다른 팀원이 로그인 페이지의 전반적인 마크업과 layout, css를 작업한 부분에 대해서 새롭게 리팩토링을 하였습니다.
2. 먼저 마크업과 css를 수정하기 전에 figma에 레이아웃 및 디자인을 나타내었고, 팀원들과 의견을 나눈 후 로그인 화면을 결정하였습니다.
![image](https://user-images.githubusercontent.com/65527334/171999600-87e756d0-9e4e-4e36-95b6-94d851cbb4eb.png)
3. 반응형을 고려해 레이아웃을 변경하였습니다.
4. 모아데이타 프로젝트의 메인색상인 **#7a79fd**을 이용하여 포인트 색상으로 로그인 페이지를 나타냈습니다.
![login](https://user-images.githubusercontent.com/65527334/171999419-0bc97d06-ea0f-41c9-81f8-5d69e39de160.gif)
5. 로그인 실패시 나타나는 플로팅메세지와 에러메세지의 색상을 통일하였고 경고를 나타내기 위해 **레드계열**의 색상으로 나타내었습니다.

### 회원정보 상세 페이지 Design & CSS작업
1. 마크업과 css를 작성하기 전에 먼저 figma에 레이아웃 및 디자인을 하였습니다. 많은 대시보드를 레퍼런스 하며 하나씩 그려보고 결정하였습니다.
![image](https://user-images.githubusercontent.com/65527334/172000037-9d9d2587-1e7e-4dca-b972-dc5daf6d0672.png)
2. 반응형을 고려하여 레이아웃과 css작업을 하였습니다.
3. 회원상세정보는 display gird로 나타내었으며 데스크탑과 같이 큰 화면일 때는 한 줄에 3개의 div가 나타나게 하고 점점 줄어들 수록 알맞게 변화될 수 있도록 작업하였습니다.
4. 하단의 심박수와 걸음수는 display flex로 나타내었으며 화면이 줄어들면 한줄에 모두 나타났더 차트가 flex-direction이 column으로 변경되어 두줄로 나타나도록 작업하였습니다.
![userInfo](https://user-images.githubusercontent.com/65527334/172000139-d48fcac5-5827-4b58-9d7e-bddeae1bc312.gif)

### 헤더 css 오류 수정
- 반응형을 고려하여 모바일 화면일 때 왼쪽에 나타나는 breadcrumb가 없어지게 된다. 없어진 뒤 오른쪽에 정렬되어있던 알람아이콘, 유저정보, 로그아웃 버튼이 왼쪽정렬로 변경되는 오류 발생<br/>

=> display속성인 justify-content를 수정하였습니다.

### breadcrumb 오류 수정
- 회원상세페이지로 넘어갔을 때 breadcrumb가 나타나지 않았고 다른 화면에서도 마지막에 있는 title을 클릭시 오류 발생<br/>

=> 기존에는 breadcrumb가 recoil로 되어있지 않았고 다른 팀원이 만든 코드다보니 수정하는데 어려움이 있었습니다. 양해를 구하고 breadcrumb를 recoil로 관리하였습니다.
```
export const breadcrumb = atom<IBreadcrumb>({
  key: '#breadcrumb',
  default: {
    text: [
      {
        text: '',
        disabled: true,
        href: '',
      },
    ],
  },
})
```
각 컴포넌트가 mount될 때 페이지에 알맞는 breadcrumb를  dispatch하도록 수정하였습니다. <br/>
**ex) 회원상세 페이지**
```
useMount(() => {
    setBreadcrumb({
      text: [
        { text: '홈', disabled: false, href: '/' },
        { text: '회원정보', disabled: false, href: 'userManage' },
        { text: '회원상세정보', disabled: true, href: 'userInfo' },
      ],
    })
  })
```
recoil로 관리되고 있던 breadcrumb의 데이터를 불러와 map메소드를 이용하여 나타내었으며 disabled가 true인 데이터는 span으로 나타내어 클릭시 페이지가 이동하지 않도록 하고 false인 데이터는 해당 페이지로 이동하도록 하였습니다.
```
<ul className={styles.container}>
  {getBreadcrumb.text.map((item) => (
    <li key={item.text}>{item.disabled ? <span>{item.text}</span> : <Link to={item.href}>{item.text}</Link>}</li>
  ))}
</ul>
```

## 느낀 점
10명의 팀원들과 과제를 시작하게 되면서 각자 맡게될 역할을 정하였습니다. 
전체적인 css, layout, markup, design을 맡게 되었고, 처음에는 간단한 작업이라고 생각하여 한명이 모든 작업을 하려 하였지만, 
팀원들과 의견을 나눈 후 좀 인원을 늘려 작업을 하게되었습니다.

팀프로젝트를 할 때 처음부터 기본 레이아웃을 잡아두지 않으면 나중에 더 많은 일을 해야하고 수정해야 할 일들이 많다라고 느껴 먼저 기본 레이아웃을 잡아두고 하였습니다.
그러다보니 확실히 통일된 레이아웃을 짤 수 있었으며 시간이 단축될 수 있었습니다. 그럼에도 불구하고 남의 코드를 보고 수정하고 하다보니 역시나 복잡하였습니다.
역시나 팀프로젝트를 할 때는 소통이 정말 중요하다는 것을 한번더 알게되었습니다.

다른 팀원의 기능이 끝난 뒤 css를 작업하기로 정하였고 그렇게 되면서 기다리는 시간이 적지 않게 흘러갔던 것 같습니다. 이 부분이 조금은 아쉬움이 남습니다.
그리고 처음부터 디자인을 정해야했기 때문에 레퍼런스를 했음에도 불구하고 생각보다 쉽게 결정되지 않는 어려움을 겪기도 하였습니다.
이번 프로젝트를 하면서 팀원과의 소통, 협업, 그리고 마크업과 css의 중요성을 알게되는 시간이었습니다.
