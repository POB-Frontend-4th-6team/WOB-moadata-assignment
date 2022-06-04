import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import dayjs from 'dayjs'

import { isSearchInputResetState, userInputDataState } from 'states/userSearch'

import { Button } from 'routes/_components/Button'
import SearchDateRange from 'routes/_components/SearchDateRange'

import { cx } from 'styles'
import styles from './search.module.scss'
import DropDown from 'routes/_components/DropDown'

const USERDATA_CATEGORIES = ['로그인 ID', '회원번호']

const today = dayjs(new Date()).format('YYYYMMDD')

const Search = () => {
  const [userInputData, setUserInputData] = useRecoilState(userInputDataState)
  const [, setIsSearchInputReset] = useRecoilState(isSearchInputResetState)

  const [weeks, setWeeks] = useState(['20220101', today])
  const [currentCategory, setCurrentCategory] = useState('로그인 ID')
  const [userInput, setUserInput] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value)
  }

  const handleSetUserInputData = (e: FormEvent) => {
    e.preventDefault()

    if (userInput === '') {
      setUserInputData({
        ...userInputData,
        userId: undefined,
        userNumber: undefined,
        startDate: Number(dayjs(weeks[0]).format('YYYYMMDD')),
        endDate: Number(dayjs(weeks[1]).format('YYYYMMDD')),
      })
      return
    }

    if (currentCategory === '로그인 ID') {
      setUserInputData({
        ...userInputData,
        userNumber: undefined,
        userId: userInput,
        startDate: Number(dayjs(weeks[0]).format('YYYYMMDD')),
        endDate: Number(dayjs(weeks[1]).format('YYYYMMDD')),
      })
    }

    if (currentCategory === '회원번호') {
      setUserInputData({
        ...userInputData,
        userId: undefined,
        userNumber: Number(userInput),
        startDate: Number(weeks[0]),
        endDate: Number(weeks[1]),
      })
    }
  }

  const resetSearchOption = () => {
    setIsSearchInputReset(true)
    setCurrentCategory('로그인 ID')
    setUserInput('')
    setWeeks(['20220101', today])
    setUserInputData({
      ...userInputData,
      userId: undefined,
      userNumber: undefined,
      startDate: 20220101,
      endDate: Number(today),
    })
  }

  useEffect(() => {
    if (weeks.length === 0) {
      setWeeks(['20220101', today])
    }
  }, [weeks])

  return (
    <form className={styles.container} onSubmit={handleSetUserInputData}>
      <div className={styles.column}>
        <DropDown selectList={USERDATA_CATEGORIES} setCurrentSelect={setCurrentCategory} size='small'>
          {currentCategory}
        </DropDown>
        <input type='text' onChange={handleInputChange} value={userInput} className={styles.dropDownInput} />
      </div>
      <div className={cx(styles.column, styles.secondColumn, styles.searchControl)}>
        <SearchDateRange setWeeks={setWeeks} />
        <div className={styles.buttonContainer}>
          <Button type='button' size='large' onClick={resetSearchOption}>
            초기화
          </Button>
          <Button type='submit' size='large' primary onSubmit={handleSetUserInputData}>
            검색
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Search
