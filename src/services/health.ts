import dayjs from 'dayjs'
import {
  convertPeriodData,
  convertTodayData,
  filterDataByDate,
  getJsonData,
  initializeDataObject,
  mergeArray,
} from 'utils/chart'
import { getMemberSeq } from './user'

const getTodayRateData = (dateList: string[], id: string, type: string) => {
  const seq = getMemberSeq(id)
  if (!seq) return []
  const data = getJsonData(seq, type)
  const filteredData = filterDataByDate(data, dateList)
  const convertedData = convertTodayData(filteredData, type)

  return convertedData
}

const getPeriodRateData = (dateList: string[], id: string, type: string) => {
  const seq = getMemberSeq(id)
  if (!seq) return []
  const data = getJsonData(seq, type)
  let tempDateList = dateList

  if (dateList.length === 0) {
    const startDate = dayjs(data[data.length - 1].x).format('YYYY-MM-DD')
    const endDate = dayjs(data[0].x).format('YYYY-MM-DD')
    tempDateList = [startDate, endDate]
  }

  const initialTempData = initializeDataObject(type, tempDateList)
  const filteredData = filterDataByDate(data, tempDateList)
  const convertedData = convertPeriodData(filteredData, type)

  const result = mergeArray(initialTempData, convertedData)

  return result
}

export { getTodayRateData, getPeriodRateData }
