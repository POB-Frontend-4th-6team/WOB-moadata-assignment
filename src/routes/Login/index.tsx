import styles from './login.module.scss'
import { useState } from 'react'
import loginBackgroundImg from '../../assets/images/loginBackgroundImg.jpg'
import { FaEye, FaEyeSlash, FaUser, FaTrash } from 'react-icons/fa'

const UserManage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState('')

  const toggleVisiblePw = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.loginComponentWrapper}>
      <img src={loginBackgroundImg} alt='login Background Img' />
      <div className={styles.loginBoxContainer}>
        <h1 className={styles.title}>Hello Again!</h1>
        <form
          action=''
          method='POST'
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className={styles.inputBox}>
            <input
              value={userId}
              type='text'
              name='userId'
              onChange={(e) => {
                setUserId(e.target.value)
              }}
            />
            <label htmlFor='userId'>ID</label>
            <FaUser className={styles.faUserIcon} />
          </div>
          <div className={styles.inputBox}>
            <input
              value={password}
              type={showPassword ? 'text' : 'password'}
              name='password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <label htmlFor='password'>password</label>
            {showPassword ? (
              <FaEye className={styles.faEyeIcon} onClick={toggleVisiblePw} />
            ) : (
              <FaEyeSlash className={styles.faEyeIcon} onClick={toggleVisiblePw} />
            )}
          </div>
          <div className={styles.extraFeaturesWrapper}>
            <label>
              <input type='checkbox' /> Remember Me
            </label>
            <span className={styles.recoveryPassword}>Recovery ID / Password</span>
          </div>
          {/* class명 hidden 또는 floatingMsg */}
          <div className={styles.floatingMsg}>Wrong password or ID. Try again</div>
          <button className={styles.loginBtn} type='submit'>
            login
          </button>
        </form>
      </div>
      <div className={styles.notificationPopUpContainer}>
        {/* 팝업메시지 컴포넌트화 시켜서 로그인 실패시 로그인 화면에서 해당 팝업메시지 fade in x클릭시 out, 로그인 성공시 홈화면에서, 로그아웃시 로그인화면에서 구현하면 될듯싶네요 */}
        <div className={styles.popUpMsg}>
          Wrong password or ID. Try again <FaTrash className={styles.handlePopUpIcon} />
        </div>
      </div>
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
