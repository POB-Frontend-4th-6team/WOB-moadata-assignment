import { useNavigate } from 'react-router-dom'

import { Alarm, Profile } from 'assets/svgs'
import Breadcrumb from './Breadcrumb'
import styles from './header.module.scss'

const Header = () => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    sessionStorage.removeItem('admin')
    navigate('login')
  }

  return (
    <header>
      <Breadcrumb />
      <ul className={styles.userMenus}>
        <li>
          <Alarm />
        </li>
        <li>
          <Profile />
          <span>admin님</span>
        </li>
        <li>
          <button type='button' onClick={handleLogOut}>
            로그아웃
          </button>
        </li>
      </ul>
    </header>
  )
}

export default Header
