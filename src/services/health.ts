import dayjs from 'dayjs'

import { heartRate, stepRate } from 'assets/jsons/index'

interface IRateObject {
  x: number
  y: string
}

// TODO: 파일 분리
const mergeArray = (firstArray: IRateObject[], secondArray: IRateObject[], key: string) =>
  firstArray
    .filter(
      (firstArrayValue) =>
        !secondArray.find(
          (secondArrayValue) =>
            firstArrayValue[key as keyof typeof firstArrayValue] ===
            secondArrayValue[key as keyof typeof secondArrayValue]
        )
    )
    .concat(secondArray)

const getJsonData = (seq: number, type: string) => {
  if (type === 'step') {
    const stepData = stepRate[seq as keyof typeof stepRate]
    return stepData.map((value) => {
      return { x: value.steps, y: value.crt_ymdt }
    })
  }
  const heartData = heartRate[seq as keyof typeof heartRate]
  return heartData.map((value) => {
    return { x: value.avg_beat, y: value.crt_ymdt }
  })
}

const initializeDataObject = (type: string, dateList: string[]) => {
  const tmepData: IRateObject[] = []
  dateList.forEach((dateValue) => {
    if (type === 'step') tmepData.push({ x: 0, y: dateValue })
    else tmepData.push({ x: 60, y: dateValue })
  })
  return tmepData
}

const filterDataByDate = (data: IRateObject[], dateList: string[]) => {
  return data.filter((value) => value.y >= dateList[0] && value.y <= `${dateList[dateList.length - 1]} 23:59:59`)
}

const convertTodayData = (type: string, data: IRateObject[]) => {
  const convertedData = data.map((value) => {
    const tempDate = dayjs(value.y).format('HH:mm:ss')
    return {
      x: value.x,
      y: tempDate,
    }
  })

  if (type === 'step') {
    convertedData.forEach((rate, index) => {
      if (index < convertedData.length - 1) rate.x -= convertedData[index + 1].x
    })
  }

  return convertedData
}

// getRateData
const getTodayRateData = (seq = 136, type = 'step', dateList = ['2022-04-19']) => {
  const data = getJsonData(seq, type)
  const filteredRate = filterDataByDate(data, dateList)
  const convertedData = convertTodayData(type, filteredRate)

  return convertedData
}

const getPeriodHeartRateData = (seq = 136, dateList = ['2022-04-19']) => {
  const heartData = heartRate[seq as keyof typeof heartRate]

  const tmepHeartData: IRateObject[] = []
  dateList.forEach((dateValue) => {
    tmepHeartData.push({ x: 60, y: dateValue })
  })

  const filteredRate = heartData.filter(
    (value) => value.crt_ymdt >= dateList[0] && value.crt_ymdt <= `${dateList[dateList.length - 1]} 23:59:59`
  )

  const convertedRate = filteredRate.reduce(
    (acc: { [key: string]: { x: number; y: string; count: number } }, { avg_beat: value, crt_ymdt: date }) => {
      const getDate = dayjs(date).format('YYYY-MM-DD')

      if (!acc[getDate]) {
        acc[getDate] = { x: value, y: getDate, count: 1 }
      } else {
        acc[getDate].x += value
        acc[getDate].count += 1
      }
      return acc
    },
    {}
  )

  const heartRateValues = Object.keys(convertedRate).map((key) => {
    convertedRate[key].x = Math.floor(convertedRate[key].x / convertedRate[key].count)

    const temp: { count?: number; x: number; y: string } = convertedRate[key]
    delete temp.count
    return temp
  })

  const result = mergeArray(tmepHeartData, heartRateValues, 'date')
  return result
}

// TODO: 전체 기간 데이터 가져오기
const getAllHeartRateData = (seq = 136, dateList = ['2022-04-19']) => {
  const heartData = heartRate[seq as keyof typeof heartRate]
  // all => date list 초기화
  const startDate = heartData[heartData.length - 1].crt_ymdt
  const endDate = heartData[0].crt_ymdt
  console.log(startDate, endDate)

  // while (true) {
  //   const tmp = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD')
  //   console.log(tmp)

  //   if(tmp <= endDate) {

  //   }
  // }

  const tmepHeartData: IRateObject[] = []
  dateList.forEach((dateValue) => {
    tmepHeartData.push({ x: 60, y: dateValue })
  })

  const convertedRate = heartData.reduce(
    (acc: { [key: string]: { x: number; y: string; count: number } }, { avg_beat: value, crt_ymdt: date }) => {
      const getDate = dayjs(date).format('YYYY-MM-DD')
      // console.log(getDate)
      // console.log(dayjs(date).add(1, 'day').format('YYYY-MM-DD'))
      if (!acc[getDate]) {
        acc[getDate] = { x: value, y: getDate, count: 1 }
      } else {
        acc[getDate].x += value
        acc[getDate].count += 1
      }
      return acc
    },
    {}
  )

  const heartRateValues = Object.keys(convertedRate).map((key) => {
    convertedRate[key].x = Math.floor(convertedRate[key].x / convertedRate[key].count)

    const temp: { count?: number; x: number; y: string } = convertedRate[key]
    delete temp.count
    return temp
  })

  const result = mergeArray(tmepHeartData, heartRateValues, 'date')
  return result
}

const getPeriodStepRateData = (seq = 136, dateList = ['2022-02-26', '2022-04-17', '2022-04-18', '2022-04-19']) => {
  const stepData = stepRate[seq as keyof typeof heartRate]

  const tmep: IRateObject[] = []
  dateList.forEach((dateValue) => {
    tmep.push({ x: 0, y: dateValue })
  })

  const filteredStepData = stepData.filter(
    (value) => value.crt_ymdt >= dateList[0] && value.crt_ymdt <= `${dateList[dateList.length - 1]} 23:59:59`
  )

  const convertedRate = filteredStepData.reduce((acc: { [key: string]: IRateObject }, { steps, crt_ymdt: date }) => {
    const getDate = dayjs(date).format('YYYY-MM-DD')
    if (!acc[getDate]) {
      acc[getDate] = { x: steps, y: getDate }
    }

    return acc
  }, {})

  const stepRateValues = Object.keys(convertedRate).map((key) => {
    const tmp: { x: number; y: string } = convertedRate[key]
    return tmp
  })

  const result = mergeArray(tmep, stepRateValues, 'date')
  return result
}

export { getTodayRateData, getPeriodHeartRateData, getAllHeartRateData, getPeriodStepRateData }
