import styles from './login.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import loginBackgroundImg from '../../assets/images/loginBackgroundImg.jpg'

const UserManage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState('')
  const toggleVisiblePw = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.loginComponentWrapper}>
      <img src={loginBackgroundImg} alt='login Background Img' />
      <div className={styles.loginContainer}>
        <div className={styles.loginBoxWrapper}>
          <h1 className={styles.loginTitle}>Hello Again!</h1>
          <form action='' method='POST'>
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
              <FontAwesomeIcon className={styles.faUserIcon} icon={faUser} />
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
                <FontAwesomeIcon className={styles.faEyeIcon} icon={faEye} onClick={toggleVisiblePw} />
              ) : (
                <FontAwesomeIcon className={styles.faEyeIcon} icon={faEyeSlash} onClick={toggleVisiblePw} />
              )}
            </div>
            <div className={styles.extraFeaturesWrapper}>
              <label>
                <input type='checkbox' /> Remember Me
              </label>
              <span className={styles.recoveryPassword}>Recovery ID / Password</span>
            </div>
            <div className={styles.hidden}>Wrong password or ID. Try again</div>
            {/* class명 hidden 또는 floatingMsg */}
            <button className={styles.loginButton} type='button'>
              login
            </button>
          </form>
        </div>
      </div>
      <div className={styles.notificationPopUpContainer}>
        {/* 팝업메시지 컴포넌트화 시켜서 로그인 실패시 로그인 화면에서 해당 팝업메시지 fade in x클릭시 out, 로그인 성공시 홈화면에서, 로그아웃시 로그인화면에서 구현하면 될듯싶네요 */}
        <div className={styles.popUpMsg}>
          Wrong password or ID. Try again <FontAwesomeIcon className={styles.handlePopUpIcon} icon={faXmark} />
        </div>
      </div>
      {/* <div className={styles.notificationPopUpContainer}>
        <div className={styles.popUpMsg}>login succeeded</div>
      </div>
      <div className={styles.notificationPopUpContainer}>
        <div className={styles.popUpMsg}>logout succeeded</div>
      </div> */}
    </div>
  )
}

export default UserManage
