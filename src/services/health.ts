import { heartRate, stepRate } from 'assets/jsons/index'
import dayjs from 'dayjs'
import {
  convertPeriodData,
  convertTodayData,
  filterDataByDate,
  getJsonData,
  initializeDataObject,
  mergeArray,
} from 'utils/chart'

const getTodayRateData = (seq = 136, type = 'step', dateList = ['2022-03-08']) => {
  const data = getJsonData(seq, type)
  const filteredData = filterDataByDate(data, dateList)
  const convertedData = convertTodayData(filteredData, type)

  return convertedData
}

const getPeriodRateData = (dateList: string[], type = 'step', seq = 136) => {
  const data = getJsonData(seq, type)
  let tempDateList = dateList

  // 전체 기간인 경우
  if (dateList.length === 0) {
    const startDate = dayjs(data[data.length - 1].y).format('YYYY-MM-DD')
    const endDate = dayjs(data[0].y).format('YYYY-MM-DD')

    tempDateList = [startDate, endDate]
  }

  const initialTempData = initializeDataObject(type, tempDateList)

  const filteredData = filterDataByDate(data, tempDateList)
  const convertedData = convertPeriodData(filteredData, type).reverse()

  const result = mergeArray(initialTempData, convertedData)
  return result
}

// TODO: 전체 기간 데이터 가져오기 분리?
const getAllHeartRateData = (seq = 136, type = 'step') => {
  const data = getJsonData(seq, type)

  const startDate = dayjs(data[data.length - 1].y).format('YYYY-MM-DD')
  const endDate = dayjs(data[0].y).format('YYYY-MM-DD')

  const tempDateList = [startDate, endDate]
  const initialTempData = initializeDataObject(type, tempDateList, true)

  const filteredData = filterDataByDate(data, tempDateList)
  const convertedData = convertPeriodData(filteredData, type).reverse()

  const result = mergeArray(initialTempData, convertedData)
  return result
}

export { getTodayRateData, getPeriodRateData, getAllHeartRateData }
