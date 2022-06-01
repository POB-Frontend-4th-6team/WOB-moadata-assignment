import dayjs from 'dayjs'
import {
  convertPeriodData,
  convertTodayData,
  filterDataByDate,
  getJsonData,
  initializeDataObject,
  mergeArray,
} from 'utils/chart'

const getTodayRateData = (dateList: string[], seq: number, type: string) => {
  const data = getJsonData(seq, type)
  const filteredData = filterDataByDate(data, dateList)
  const convertedData = convertTodayData(filteredData, type)

  return convertedData
}

const getPeriodRateData = (dateList: string[], seq: number, type: string) => {
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
  const convertedData = convertPeriodData(filteredData, type)

  const result = mergeArray(initialTempData, convertedData)
  return result
}

// TODO: 전체 기간 데이터 가져오기 분리?
const getAllRateData = (seq: number, type: string) => {
  const data = getJsonData(seq, type)

  const startDate = dayjs(data[data.length - 1].y).format('YYYY-MM-DD')
  const endDate = dayjs(data[0].y).format('YYYY-MM-DD')

  const tempDateList = [startDate, endDate]
  const initialTempData = initializeDataObject(type, tempDateList)

  const filteredData = filterDataByDate(data, tempDateList)
  const convertedData = convertPeriodData(filteredData, type).reverse()

  const result = mergeArray(initialTempData, convertedData)
  return result
}

export { getTodayRateData, getPeriodRateData, getAllRateData }
