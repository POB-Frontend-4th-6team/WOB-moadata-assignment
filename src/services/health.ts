import dayjs from 'dayjs'

import { heartRate, stepRate } from 'assets/jsons/index'
import {
  convertPeriodData,
  convertTodayData,
  filterDataByDate,
  getJsonData,
  initializeDataObject,
  mergeArray,
} from 'utils/chart'

interface IRateObject {
  x: number
  y: string
}

const getTodayRateData = (seq = 136, type = 'step', dateList = ['2022-04-19']) => {
  const data = getJsonData(seq, type)
  const filteredData = filterDataByDate(data, dateList)
  const convertedData = convertTodayData(filteredData, type)

  return convertedData
}

const getPeriodRateData = (
  seq = 136,
  type = 'step',
  dateList = ['2022-03-08', '2022-04-17', '2022-04-18', '2022-04-19']
) => {
  const data = getJsonData(seq, type)
  const initialTempData = initializeDataObject(type, dateList)

  const filteredData = filterDataByDate(data, dateList)
  const convertedData = convertPeriodData(filteredData, type).reverse()

  const result = mergeArray(initialTempData, convertedData)
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
}

export { getTodayRateData, getPeriodRateData, getAllHeartRateData }
