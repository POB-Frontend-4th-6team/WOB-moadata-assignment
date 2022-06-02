import { Dispatch, SetStateAction, useState } from 'react'
import { DateRange, Range } from 'react-date-range'
import dayjs from 'dayjs'
import ko from 'date-fns/locale/ko'

import { Button } from '../Button'
import styles from './datePickerModal.module.scss'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface IProps {
  setWeeks: Dispatch<SetStateAction<string[]>>
  setIsDatePickerOpen: Dispatch<SetStateAction<boolean>>
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
  setSelectedPeriod: Dispatch<SetStateAction<string>>
}

const DatePickerModal = ({ setWeeks, setIsDatePickerOpen, setStartDate, setEndDate, setSelectedPeriod }: IProps) => {
  const today = new Date()
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: dayjs(today).add(-1, 'day').toDate(),
      endDate: today,
      key: 'selection',
    },
  ])

  const handleCloseDatePickerModal = () => {
    setIsDatePickerOpen(false)
  }

  const handleSetPickedDateRange = () => {
    setWeeks([dayjs(dateRange[0].startDate).format('YYYY-MM-DD'), dayjs(dateRange[0].endDate).format('YYYY-MM-DD')])
    setStartDate(dayjs(dateRange[0].startDate).format('YYYY-MM-DD'))
    setEndDate(dayjs(dateRange[0].endDate).format('YYYY-MM-DD'))
    setIsDatePickerOpen(false)
    setSelectedPeriod('')
  }

  return (
    <aside className={styles.container}>
      <section className={styles.calendarContainer}>
        <DateRange
          editableDateInputs={false}
          onChange={(item) => setDateRange([item.selection])}
          ranges={dateRange}
          locale={ko}
          months={2}
          direction='horizontal'
          dateDisplayFormat='yyyy년 MM월 dd일'
          maxDate={new Date()}
          showPreview={false}
          monthDisplayFormat='yyyy년 MM월'
          rangeColors={['#586cf5']}
          showDateDisplay={false}
        />
      </section>
      <section className={styles.buttonContainer}>
        <Button size='large' onClick={handleCloseDatePickerModal}>
          취소
        </Button>
        <Button size='large' primary onClick={handleSetPickedDateRange}>
          적용
        </Button>
      </section>
    </aside>
  )
}

export default DatePickerModal
