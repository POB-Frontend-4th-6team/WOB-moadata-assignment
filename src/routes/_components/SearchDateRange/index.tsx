import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import dayjs from 'dayjs'
import { Range } from 'react-date-range'

import { Button } from '../Button'
import styles from './searchDateRange.module.scss'
import DatePickerModal from '../DatePickerModal'

interface IProps {
  setWeeks: Dispatch<SetStateAction<string[]>>
}

const SearchDateRange = ({ setWeeks }: IProps) => {
  const today = new Date()

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: today,
      endDate: today,
      key: 'selection',
    },
  ])

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [startDate, setStartDate] = useState('전체')
  const [endDate, setEndDate] = useState('전체')

  const [selectedPeriod, setSelectedPeriod] = useState('전체')

  const handleStartDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.currentTarget.value)
  }
  const handleEndDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.currentTarget.value)
  }

  const handleOpenDatePickerModal = () => {
    setIsDatePickerOpen(true)
  }

  const handleSetToToday = () => {
    setSelectedPeriod('오늘')
    setStartDate(dayjs(today).format('YYYY-MM-DD'))
    setEndDate(dayjs(today).format('YYYY-MM-DD'))
    setWeeks([dayjs(today).format('YYYY-MM-DD'), dayjs(today).format('YYYY-MM-DD')])
    setDateRange([{ ...dateRange[0], startDate: today, endDate: today }])
  }

  const handleSetToOneWeek = () => {
    setSelectedPeriod('일주일')
    setStartDate(dayjs(today).add(-6, 'day').format('YYYY-MM-DD'))
    setEndDate(dayjs(today).format('YYYY-MM-DD'))
    setWeeks([dayjs(today).add(-6, 'day').format('YYYY-MM-DD'), dayjs(today).format('YYYY-MM-DD')])
    setDateRange([{ ...dateRange[0], startDate: dayjs(today).add(-6, 'day').toDate(), endDate: dayjs(today).toDate() }])
  }

  const handleSetToAll = () => {
    setSelectedPeriod('전체')
    setStartDate('전체')
    setEndDate('전체')
    setWeeks([])
    setDateRange([{ ...dateRange[0], startDate: today, endDate: today }])
  }

  return (
    <section className={styles.container}>
      <div className={styles.inputs}>
        <label htmlFor='dateRange'>조회 기간</label>
        <input
          id='dateRange'
          type='text'
          placeholder={startDate}
          value={startDate}
          onChange={handleStartDateInput}
          onClick={handleOpenDatePickerModal}
        />
        <span className={styles.endDate}>~</span>
        <input
          type='text'
          placeholder={endDate}
          value={endDate}
          onChange={handleEndDateInput}
          onClick={handleOpenDatePickerModal}
          className={styles.endDate}
        />
      </div>
      <div className={styles.buttons}>
        <Button size='large' primary={selectedPeriod === '오늘'} onClick={handleSetToToday}>
          오늘
        </Button>
        <Button size='large' primary={selectedPeriod === '일주일'} onClick={handleSetToOneWeek}>
          일주일
        </Button>
        <Button size='large' primary={selectedPeriod === '전체'} onClick={handleSetToAll}>
          전체
        </Button>
      </div>
      {isDatePickerOpen && (
        <DatePickerModal
          dateRange={dateRange}
          setDateRange={setDateRange}
          setIsDatePickerOpen={setIsDatePickerOpen}
          setWeeks={setWeeks}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelectedPeriod={setSelectedPeriod}
        />
      )}
    </section>
  )
}

export default SearchDateRange
