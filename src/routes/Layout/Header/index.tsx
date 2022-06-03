import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { sidebarDrawer } from 'states/sidebarDrawer'
import { Alarm, Profile, HamburgerMenu } from 'assets/svgs'
import Breadcrumb from './Breadcrumb'
import styles from './header.module.scss'

const Header = () => {
  const navigate = useNavigate()

  const [isSidebarShow, setSidebar] = useRecoilState(sidebarDrawer)

  const handleLogOut = () => {
    sessionStorage.removeItem('admin')
    navigate('login')
  }
  const handleMobileClick = () => {
    setSidebar(!isSidebarShow)
  }

  return (
    <header>
      <button className={styles.hamburgerMenu} type='button' onClick={handleMobileClick}>
        <HamburgerMenu />
      </button>
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
