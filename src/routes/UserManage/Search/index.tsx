import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import dayjs from 'dayjs'

import { userInputDataState } from 'states/userSearch'

import { Button } from 'routes/_components/Button'
import SearchDateRange from 'routes/_components/SearchDateRange'
import { DownArrow } from 'assets/svgs'
import { cx } from 'styles'
import styles from './search.module.scss'

const USERDATA_CATEGORIES = ['로그인 ID', '회원번호']

const today = dayjs(new Date()).format('YYYYMMDD')

const Search = () => {
  const [userInputData, setUserInputData] = useRecoilState(userInputDataState)
  const [weeks, setWeeks] = useState(['20220101', today])
  const [currentCategory, setCurrentCategory] = useState('로그인 ID')
  const [userInput, setUserInput] = useState('')
  const [placeholder, setPlaceholder] = useState('검색할 ID를 입력하세요')
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value)
  }

  const handleDropDownToggle = () => {
    setIsDropDownOpen((prev) => !prev)
  }

  const handleCategorySelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedValue = e.currentTarget.dataset.value
    setCurrentCategory(selectedValue ?? USERDATA_CATEGORIES[0])
    setPlaceholder(selectedValue ?? USERDATA_CATEGORIES[0])
    setIsDropDownOpen(false)
  }

  const handleSetUserInputData = () => {
    if (userInput === '') {
      setUserInputData({
        ...userInputData,
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

  const resetSearchOption = useResetRecoilState(userInputDataState)

  console.log(weeks)

  useEffect(() => {
    if (weeks.length === 0) {
      setWeeks(['20220101', today])
    }
  }, [weeks])

  console.log(userInputData)

  return (
    <form className={styles.container}>
      {/* 로그인ID / 회원번호 중에 택일하도록 할 드롭다운 입니다 */}
      <div className={styles.userInfoInputsContainer}>
        <div className={styles.dropDown}>
          {currentCategory}
          <DownArrow
            className={cx(styles.downArrowIcon, { [styles.dropDownOpen]: isDropDownOpen })}
            onClick={handleDropDownToggle}
          />
          {isDropDownOpen && (
            <ul className={cx(styles.selectMenuList, { [styles.selectMenuListOpen]: isDropDownOpen })}>
              {USERDATA_CATEGORIES?.map((category) => (
                <li aria-selected role='option' key={category} data-value={category} onClick={handleCategorySelect}>
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input type='text' onChange={handleUserInput} placeholder={`${placeholder}를 검색하세요`} value={userInput} />
      </div>
      <div className={styles.dateRange}>
        <SearchDateRange setWeeks={setWeeks} />
      </div>
      <div className={styles.formButtonsContainer}>
        <Button size='large' onClick={resetSearchOption}>
          초기화
        </Button>
        <Button size='large' primary onClick={handleSetUserInputData}>
          검색
        </Button>
      </div>
    </form>
  )
}

export default Search
