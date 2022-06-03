import { Dispatch, SetStateAction } from 'react'
import { DateRange, Range } from 'react-date-range'
import dayjs from 'dayjs'
import ko from 'date-fns/locale/ko'

import { useOnClickOutside } from 'hooks'

import { Button } from '../Button'
import styles from './datePickerModal.module.scss'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface IProps {
  dateRange: Range[]
  setDateRange: Dispatch<SetStateAction<Range[]>>
  setWeeks: Dispatch<SetStateAction<string[]>>
  setIsDatePickerOpen: Dispatch<SetStateAction<boolean>>
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
  setSelectedPeriod: Dispatch<SetStateAction<string>>
}

const DatePickerModal = ({
  dateRange,
  setDateRange,
  setWeeks,
  setIsDatePickerOpen,
  setStartDate,
  setEndDate,
  setSelectedPeriod,
}: IProps) => {
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

  const datePickerRef = useOnClickOutside(() => setIsDatePickerOpen(false))

  return (
    <aside className={styles.container} ref={datePickerRef}>
      <section className={styles.calendarContainer}>
        <DateRange
          editableDateInputs
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
          showDateDisplay
          fixedHeight
        />
        <div className={styles.buttonContainer}>
          <Button type='button' size='large' onClick={handleCloseDatePickerModal}>
            취소
          </Button>
          <Button type='button' size='large' primary onClick={handleSetPickedDateRange}>
            적용
          </Button>
        </div>
      </section>
    </aside>
  )
}

export default DatePickerModal
