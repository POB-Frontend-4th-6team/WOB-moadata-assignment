import dayjs from 'dayjs'
import { stepRate, heartRate } from 'assets/jsons/index'

interface IRateObject {
  x: number
  y: string
}

const mergeArray = (firstArray: IRateObject[], secondArray: IRateObject[]) =>
  firstArray.reduce((acc: IRateObject[], { x, y }) => {
    const index = secondArray.findIndex((secondValue) => secondValue.y === y)

    if (index !== -1) acc.push({ x: secondArray[index].x, y })
    else acc.push({ x, y })

    return acc
  }, [])

const getJsonData = (seq: number, type: string) => {
  if (type === 'step') {
    const stepData = stepRate[seq as keyof typeof stepRate].map((value) => {
      return { x: value.steps, y: value.crt_ymdt }
    })
    return stepData
  }

  const heartData = heartRate[seq as keyof typeof heartRate].map((value) => {
    return { x: value.avg_beat, y: value.crt_ymdt }
  })
  return heartData
}

const initializeDataObject = (type: string, dateList: string[]) => {
  let tempDate = dateList[0]
  const tempX = type === 'step' ? 0 : 60
  const tmepInitialList: IRateObject[] = [{ x: tempX, y: tempDate }]

  while (tempDate < dateList[1]) {
    tempDate = dayjs(tempDate).add(1, 'day').format('YYYY-MM-DD')
    if (type === 'step') tmepInitialList.push({ x: tempX, y: tempDate })
    else tmepInitialList.push({ x: tempX, y: tempDate })
  }

  return tmepInitialList
}

const filterDataByDate = (data: IRateObject[], dateList: string[]) => {
  const startDate = dateList[0]
  const endDate = dateList[dateList.length - 1]

  return data.filter((value) => value.y >= startDate && value.y <= `${endDate} 23:59:59`)
}

const convertTodayData = (data: IRateObject[], type: string) => {
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

  return convertedData.reverse()
}

// TODO: Refactoring
const convertPeriodData = (data: IRateObject[], type: string) => {
  const convertedData = data.reduce((acc: { [key: string]: { x: number; y: string; count: number } }, { x, y }) => {
    const getDate = dayjs(y).format('YYYY-MM-DD')
    if (!acc[getDate]) {
      acc[getDate] = { x, y: getDate, count: 1 }
    } else if (type === 'heart') {
      acc[getDate].x += x
      acc[getDate].count += 1
    }

    return acc
  }, {})

  const rateValues = Object.keys(convertedData)
    .map((key) => {
      if (type === 'heart') convertedData[key].x = Math.floor(convertedData[key].x / convertedData[key].count)

      const temp: { count?: number; x: number; y: string } = convertedData[key]
      delete temp.count
      return temp
    })
    .reverse()

  return rateValues
}

export { mergeArray, getJsonData, initializeDataObject, filterDataByDate, convertTodayData, convertPeriodData }
