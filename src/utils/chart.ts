import dayjs from 'dayjs'
import { stepRate, heartRate } from 'assets/jsons/index'
import { IChartObject } from 'types/chart.d'

const mergeArray = (firstArray: IChartObject[], secondArray: IChartObject[]) =>
  firstArray.reduce((acc: IChartObject[], { x, y }) => {
    const index = secondArray.findIndex((secondValue) => secondValue.x === x)

    if (index !== -1) acc.push({ x, y: secondArray[index].y })
    else acc.push({ x, y })

    return acc
  }, [])

const getJsonData = (seq: number, type: string) => {
  if (type === 'step') {
    const stepData = stepRate[seq as keyof typeof stepRate].map((value) => {
      return { x: value.crt_ymdt, y: value.steps }
    })
    return stepData
  }

  if (type === 'heart') {
    const heartData = heartRate[seq as keyof typeof heartRate].map((value) => {
      return { x: value.crt_ymdt, y: value.avg_beat }
    })
    return heartData
  }

  throw new Error('Error')
}

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

const filterDataByDate = (data: IChartObject[], dateList: string[]) => {
  const startDate = dateList[0]
  const endDate = dateList[dateList.length - 1]

  return data.filter((value) => value.x >= startDate && value.x <= `${endDate} 23:59:59`)
}

const convertTodayData = (data: IChartObject[], type: string) => {
  const convertedData = data.map((value) => {
    const tempDate = dayjs(value.x).format('HH:mm')
    return {
      x: tempDate,
      y: value.y,
    }
  })

  if (type === 'step') {
    convertedData.forEach((rate, index) => {
      if (index < convertedData.length - 1) rate.y -= convertedData[index + 1].y
    })
  }

  return convertedData.reverse()
}

const convertPeriodData = (data: IChartObject[], type: string) => {
  const convertedData = data.reduce((acc: { [key: string]: { x: string; y: number; count: number } }, { x, y }) => {
    const getDate = dayjs(x).format('YY-MM-DD')
    if (!acc[getDate]) {
      acc[getDate] = { x: getDate, y, count: 1 }
    } else if (type === 'heart') {
      acc[getDate].y += y
      acc[getDate].count += 1
    }
    return acc
  }, {})

  const rateValues = Object.keys(convertedData)
    .map((key) => {
      if (type === 'heart') convertedData[key].y = Math.floor(convertedData[key].y / convertedData[key].count)

      const temp: { count?: number; x: string; y: number } = convertedData[key]
      delete temp.count
      return temp
    })
    .reverse()

  return rateValues
}

export { mergeArray, getJsonData, initializeDataObject, filterDataByDate, convertTodayData, convertPeriodData }
