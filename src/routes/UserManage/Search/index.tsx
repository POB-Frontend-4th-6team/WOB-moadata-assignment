import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Button } from 'routes/_components/Button'
import SearchDateRange from 'routes/_components/SearchDateRange'

import { searchedDateRangeState } from 'states/userSearch'

import styles from './search.module.scss'

const Search = () => {
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [searchedDateRange, setSearchedDateRange] = useRecoilState(searchedDateRangeState)
  const [weeks, setWeeks] = useState(['', ''])

  return (
    <form className={styles.container}>
      {/* 로그인ID / 회원번호 중에 택일하도록 할 드롭다운 입니다 */}
      <div className={styles.userInfoInputsContainer}>
        <div className={styles.dropDown}>드롭다운</div>
        <input id='userId' type='text' />
      </div>
      <div className={styles.dateRange}>
        <SearchDateRange setWeeks={setWeeks} />
      </div>

      <div className={styles.formButtonsContainer}>
        <Button size='large'>초기화</Button>
        <Button size='large' primary>
          검색
        </Button>
      </div>
    </form>
  )
}

export default Search
