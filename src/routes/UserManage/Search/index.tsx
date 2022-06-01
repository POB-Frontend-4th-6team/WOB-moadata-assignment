import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Button } from 'routes/_components/Button'

import { searchedDateRangeState } from 'states/userSearch'

import styles from './search.module.scss'

const Search = () => {
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [searchedDateRange, setSearchedDateRange] = useRecoilState(searchedDateRangeState)

  return (
    <form className={styles.container}>
      <div className={styles.userInfoInputsContainer}>
        <label htmlFor='userId'>로그인 ID</label>
        <input id='userId' type='text' />
        <label htmlFor='userNumber'>회원 번호</label>
        <input id='userNumber' type='text' />
      </div>
      <div className={styles.dateRangeInputContainer}>
        <label htmlFor='searchRange'>조회기간</label>
        <input id='searchRange' type='text' /> ~
        <input id='searchRange' type='text' />
        <Button size='large'>오늘</Button>
        <Button size='large'>일주일</Button>
        <Button size='large' primary>
          전체
        </Button>
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
