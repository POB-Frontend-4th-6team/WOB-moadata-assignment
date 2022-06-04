## 역할
1. 심박수, 걸음 수의 JOSN 파일을 가공하여 차트 데이터 제공하기
2. 코드 리뷰
<br>

## 개발 초기
- 할 일: 심박수와 걸음수 데이터를 가공하여 보내주기
  - `오늘` 데이터는 10분 마다의 데이터를 저장하여 보내준다.
    - 걸음수: 누적되어 있는 걸음 수를 계산하여 10분 마다의 걸음 수를 반환
    - 심박수: 평균 심박수
        
  - `기간` 데이터 (일주일, 전체, 특정 기간)은 하루의 데이터를 보여준다.
    - 걸음수: 누적 데이터 (하루 걸음 누적 수)
    - 심박수: 평균 데이터 (하루 평균 심박수를 다 더해서 평균을 구한다.)


```js
// 오늘 데이터 예시
[{beat: 120, date: '2022-02-25 19:41:20'}, {beat: 99, date: '2022-02-25 19:51:20'}, ...]

// 기간 데이터 예시
[{beat: 88, date: '2022-02-25'}, {beat: 92, date: '2022-02-26'}, ...]
```
<br>

- 심박수, 걸음 수의 오늘 데이터, 기간 데이터를 JSON 파일에서 추출하여 합치기

  - 심박수의 경우 오늘 데이터는 JSON 파일에서 바로 불러와 저장해 주면 돼서 간단했는데, 기간별 데이터는 특정 날짜의 모든 데이터를 가져와 더하고 개수만큼 나눠 평균을 구해줘야 해서 까다로웠다.
  
  - 반대로 걸음수는 오늘 데이터가 누적되어 있어 10분 단위의 실제 걸음수를 구하기 까다로웠다.

<br>

### 심박 수의 기간 별 데이터 구하기
- 인자: `userId`, `dateList[]`: *(`[시작 date, 종료 date]`)*

    1. 파일의 전체 데이터를 시작 날짜와 종료 날짜로 `filter` 한다.
    2. `filter`한 데이터를 `reduce`를 돌려 특정 날짜의 데이터를 객체에 저장하고 카운트 속성을 주어 개수를 세준다.
        1. 결과: `{2022-02-22: {beat: 2200, date: '2022-02-22', count: 22}, ...}`

    3. 하루의 평균 값을 구하고 카운트 속성을 없애준다.

```js
// 기간 데이터의 값
const filter = heartData
                .filter((value) => value.crt_ymdt >= dateList[0] && value.crt_ymdt <= `${dateList[dateList.length - 1]} 23:59:59`)
                .reduce(
                  (acc: { [key: string]: { beat: number; date: string; count: number } }, { avg_beat: beat, crt_ymdt: date }) => {
                    const getDate = dayjs(date).format('YYYY-MM-DD')
                    if (!acc[getDate]) {
                      acc[getDate] = { beat, date: getDate, count: 1 }
                    } else {
                      acc[getDate].beat += beat
                      acc[getDate].count += 1
                    }
                    return acc
                  },
                  {}
                )
            
// count 없애기
const values = Object.keys(filter).map((key) => {
  filter[key].beat = Math.floor(filter[key].beat / filter[key].count)
  const tmp: { count?: number; beat: number; date: string } = filter[key]
     delete tmp.count
     return tmp
})
```
<br> 
        
### 중간에 빈 날짜들의 value를 초기화해주기
- 기간 데이터를 경우 중간에 데이터가 없는 날짜는 초깃값으로 초기화해준다. 
  - 걸음수: 0, 심박수: 60

```js
const initializeDataObject = (type: string, dateList: string[]) => {
  let tempDate = dateList[0]
  const tempX = type === 'step' ? 0 : 60
  const tmepInitialList: IChartObject[] = [{ x: dayjs(tempDate).format('YY-MM-DD'), y: tempX }]

  while (tempDate < dateList[1]) {
    tempDate = dayjs(tempDate).add(1, 'day').format('YYYY-MM-DD')
    tmepInitialList.push({ x: dayjs(tempDate).format('YY-MM-DD'), y: tempX })
  }

  return tmepInitialList
}
// ...

// values는 파일에서 가져온 데이터를 가공한 리스트
mergeArrays(initializeDataObject, values)
```
<br>
    
## 개발 중반
- 오늘, 기간 데이터 리팩토링
  - 오늘 데이터 함수와 기간 데이터 함수를 각각 통합
    
  - `steprate` - '걸음수', `heartrate` - '심박수' 를 둘 다 하나의 함수를 사용할 수 있도록 통합 (`type`으로 구별)
    - `getTodayRateData`: 오늘 데이터를 십분 단위로 모두 가져오기
      - 파라미터: `type` , `dateList`, `memberId`
        
    - `getPeriodRateData`: 기간 설정 데이터, 전체 기간 데이터 가져오기
      - 파라미터: `type` , `dateList`, `memberId`

    
<br>

## 개발 후반
- 전체 기간 데이터 함수를 기간 데이터 함수와 통합 (`getPeriodRateData`로 통합)
  - 인자 값인 `dateList[]`가 빈 배열로 주어지면 전체 기간의 데이터를 구한다.
  - 전체 기간인 경우, 파일에서 가장 오래된 날짜와 최근 날짜를 구해 그 안의 데이터를 가져와 가공한다.

- 반환 값 구조 변경
  - `victory.js`의 차트 데이터로 사용하기 위해서 객체의 key를 `x`, `y`로 변경
  - 날짜 포맷을 오늘의 경우 `HH:mm:ss`, 기간의 경우 `YY-MM-DD` 로 변경

<br>

- `utils`와 `services` 폴더 각각의 파일에 코드 분리
  - `services/health.ts`
    - `getTodayRateData`: 타입 별 오늘 데이터 가져오기
    - `getPeriodRateData`: 타입 별 기간, 전체 데이터 가져오기
  <br>
    
  - `services/user.ts`
    - `getMemberSeq`: 유저 ID를 member_Seq로 변환
  <br>
  
  - `utils/chart.ts` 파일을 생성하여 로직 분리
    - `getJsonData`: JSON 파일에서 사용자에 맞는 데이터 가져오기
    - `initializeDataObject`: 데이터가 없는 날짜에 초기값을 셋팅해주기 위해 객체 배열 초기화
    - `filterDataByDate`: 시작 날짜와 종료 날짜에 맞는 데이터 필터
    - `convertTodayData`: 타입 별로 가져온 오늘 데이터를 가공
    - `convertPeriodData`: 타입 별로 가져온 기간 데이터를 가공
    - `mergeArray`: 초기화된 배열과 가공된 배열 통합

<br>

## 느낀 점
- 초반에 코드 짜기 전 정리를 하고 조금이라도 고심해서 코드를 짜야 할 것 같다.
  - 빨리 결과를 전달해 줘야겠다는 생각에 결과물 먼저 생각하고 코드를 잤더니 나중에 수정할 부분이 너무 많아졌다.
  - 그러다 보니, 코드 실수도 몇 개 해서 피해를 끼치게 되는 것 같아 스스로 반성했다.

- 최대한 반복문 없이 코드를 짜서 데이터를 가공하고 싶었는데 쉽지 않았다.
  - 좀 더 간단한 코드로 데이터를 가공할 수 있지 않았을까 아쉬움이 남았다.
