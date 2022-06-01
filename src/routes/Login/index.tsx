import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import store from 'store'

import { checkValidation } from 'services/user'

import styles from './login.module.scss'
import loginBackgroundImg from '../../assets/images/loginBackgroundImg.jpg'
import { FaEye, FaEyeSlash, FaUser, FaTrash } from 'react-icons/fa'

const UserManage = () => {
  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')

  const [isVisible, setIsVisible] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('admin') || store.get('admin')) {
      navigate('/')
    }
  }, [navigate])

  const handleIdInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAdminId(e.currentTarget.value)
    setIsError(false)
  }

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
    setIsError(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (checkValidation(adminId, password)) {
      isChecked ? store.set('admin', adminId) : store.remove('admin')
      sessionStorage.setItem('admin', adminId)
      navigate('/')
    } else {
      setIsError(true)
    }
  }

  const handleCheck = () => {
    setIsChecked((prev) => !prev)
  }

  const closeMessage = () => {
    setIsError(false)
  }

  const toggleVisiblePw = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div className={styles.loginComponentWrapper}>
      <img src={loginBackgroundImg} alt='login Background Img' />
      <div className={styles.loginBoxContainer}>
        <h1 className={styles.title}>Hello Again!</h1>
        <form action='submit' method='POST' onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label htmlFor='userId'>ID</label>
            <input value={adminId} type='text' name='userId' onChange={handleIdInput} />
            <FaUser className={styles.faUserIcon} />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor='password'>password</label>
            <input
              value={password}
              type={isVisible ? 'text' : 'password'}
              name='password'
              onChange={handlePasswordInput}
            />
            {isVisible ? (
              <FaEye className={styles.faEyeIcon} onClick={toggleVisiblePw} />
            ) : (
              <FaEyeSlash className={styles.faEyeIcon} onClick={toggleVisiblePw} />
            )}
          </div>
          <div className={styles.extraFeaturesWrapper}>
            <label>
              <input type='checkbox' checked={isChecked} onChange={handleCheck} /> Remember Me
            </label>
          </div>
          {isError && <div className={styles.floatingMsg}>Wrong password or ID. Try again</div>}
          <button className={styles.loginBtn} type='submit'>
            login
          </button>
        </form>
      </div>
      {isError && (
        <div className={styles.notificationPopUpContainer}>
          {/* 팝업메시지 컴포넌트화 시켜서 로그인 실패시 로그인 화면에서 해당 팝업메시지 fade in x클릭시 out, 로그인 성공시 홈화면에서, 로그아웃시 로그인화면에서 구현하면 될듯싶네요 */}
          <div className={styles.popUpMsg}>
            Wrong password or ID. Try again <FaTrash className={styles.handlePopUpIcon} onClick={closeMessage} />
          </div>
        </div>
      )}
      {/*
      <div className={styles.notificationPopUpContainer}>
        <div className={styles.popUpMsg}>login succeeded</div>
      </div>
      <div className={styles.notificationPopUpContainer}>
        <div className={styles.popUpMsg}>logout succeeded</div>
      </div> 
      */}
    </div>
  )
}

export default UserManage
