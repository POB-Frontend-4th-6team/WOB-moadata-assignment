import dayjs from 'dayjs'

import { heartRate, stepRate } from 'assets/jsons/index'

interface IRateObject {
  value: number
  date: string
}

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

const getTodayHeartRateData = (seq = 136, dateList = ['2022-04-19']) => {
  const heartData = heartRate[seq as keyof typeof heartRate]
  // All
  if (dateList.length === 0) {
  }

  const tmepHeartData: IRateObject[] = []
  dateList.forEach((dateValue) => {
    tmepHeartData.push({ value: 0, date: dateValue })
  })

  const filteredHeartRate = heartData.filter(
    (value) => value.crt_ymdt >= dateList[0] && value.crt_ymdt <= `${dateList[dateList.length - 1]} 23:59:59`
  )

  // today
  if (dateList[0] === dateList[dateList.length - 1]) {
    const todayHeartRate = filteredHeartRate.map((value) => {
      const tempDate = dayjs(value.crt_ymdt).format('HH-MM-SS')
      return {
        value: value.avg_beat,
        date: tempDate,
      }
    })
    return todayHeartRate
  }

  const convertedRate = filteredHeartRate.reduce(
    (acc: { [key: string]: { value: number; date: string; count: number } }, { avg_beat: value, crt_ymdt: date }) => {
      const getDate = dayjs(date).format('YYYY-MM-DD')

      if (!acc[getDate]) {
        acc[getDate] = { value, date: getDate, count: 1 }
      } else {
        acc[getDate].value += value
        acc[getDate].count += 1
      }
      return acc
    },
    {}
  )

  const heartRateValues = Object.keys(convertedRate).map((key) => {
    convertedRate[key].value = Math.floor(convertedRate[key].value / convertedRate[key].count)

    const temp: { count?: number; value: number; date: string } = convertedRate[key]
    delete temp.count
    return temp
  })

  const result = mergeArray(tmepHeartData, heartRateValues, 'date')
  return result
}

const getStepRateData = (seq = 136, dateList = ['2022-04-19']) => {
  const stepData = stepRate[seq as keyof typeof heartRate]

  const tmep: IRateObject[] = []
  dateList.forEach((dateValue) => {
    tmep.push({ value: 0, date: dateValue })
  })

  const filteredStepData = stepData.filter(
    (value) => value.crt_ymdt >= dateList[0] && value.crt_ymdt <= `${dateList[dateList.length - 1]} 23:59:59`
  )

  if (dateList[0] === dateList[dateList.length - 1]) {
    const todayStepRate = filteredStepData.map((rate) => {
      const tempDate = dayjs(rate.crt_ymdt).format('HH-MM-SS')
      return {
        value: rate.steps,
        date: tempDate,
      }
    })

    todayStepRate.forEach((rate, index) => {
      if (index < todayStepRate.length - 1) rate.value -= todayStepRate[index + 1].value
    })
    return todayStepRate
  }

  const convertedRate = filteredStepData.reduce((acc: { [key: string]: IRateObject }, { steps, crt_ymdt: date }) => {
    const getDate = dayjs(date).format('YYYY-MM-DD')
    if (!acc[getDate]) {
      acc[getDate] = { value: steps, date: getDate }
    }

    return acc
  }, {})

  const stepRateValues = Object.keys(convertedRate).map((key) => {
    const tmp: { value: number; date: string } = convertedRate[key]
    return tmp
  })

  const result = mergeArray(tmep, stepRateValues, 'date')
  return result
}

export { getHeartRateData, getStepRateData }
