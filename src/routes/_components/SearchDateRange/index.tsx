import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import dayjs from 'dayjs'

import { Button } from '../Button'
import styles from './searchDateRange.module.scss'
import { CalendarIcon } from 'assets/svgs'
import DatePickerModal from '../DatePickerModal'

interface IProps {
  weeks: string[]
  setWeeks: Dispatch<SetStateAction<string[]>>
}

const SearchDateRange = ({ weeks, setWeeks }: IProps) => {
  console.log(weeks)

  const today = new Date()

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
    setWeeks([dayjs(today).format('YYYY-MM-DD'), dayjs(today).format('YYYY-MM-DD')])
  }

  const handleSetToOneWeek = () => {
    setSelectedPeriod('일주일')
    setWeeks([dayjs(today).add(-6, 'day').format('YYYY-MM-DD'), dayjs(today).format('YYYY-MM-DD')])
  }

  const handleSetToAll = () => {
    setSelectedPeriod('전체')
    setWeeks(['전체', '전체'])
  }

  return (
    <form className={styles.container}>
      <div className={styles.inputs}>
        <label htmlFor='dateRange'>조회 기간</label>
        <input
          id='dateRange'
          type='text'
          placeholder={`${weeks[0]}`}
          value={weeks[0]}
          onChange={handleStartDateInput}
          disabled={isDatePickerOpen}
        />
        &nbsp;&nbsp; ~&nbsp;&nbsp;&nbsp;
        <input
          type='text'
          placeholder={`${weeks[1]}`}
          value={weeks[1]}
          onChange={handleEndDateInput}
          disabled={isDatePickerOpen}
        />
      </div>
      <CalendarIcon className={styles.calendarIcon} onClick={handleOpenDatePickerModal} />
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
        <div className={styles.datePicker}>
          <DatePickerModal setIsDatePickerOpen={setIsDatePickerOpen} setWeeks={setWeeks} />
        </div>
      )}
    </form>
  )
}

export default SearchDateRange
