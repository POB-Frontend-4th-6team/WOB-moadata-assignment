import { Alarm, Profile } from 'assets/svgs'
import Breadcrumb from '../Breadcrumb'
import styles from './header.module.scss'

const Header = () => {
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
          <button type='button'>로그아웃</button>
        </li>
      </ul>
    </header>
  )
}

export default Header
