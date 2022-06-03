import { Link, NavLink } from 'react-router-dom'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { sidebarDrawer } from 'states/sidebarDrawer'
import { BiHomeAlt, BiIdCard } from 'react-icons/bi'
import { LogoImage } from 'assets/svgs'
import styles from './sidebar.module.scss'
import { cx } from 'styles'

const Sidebar = () => {
  const [isSidebarShow, setIsSidebarShow] = useRecoilState(sidebarDrawer)

  const mobileMenuBtnList = useMemo(() => {
    const handleMobileMenuClick = () => {
      setIsSidebarShow((prev) => !prev)
    }

    return isSidebarShow ? (
      <ul className={styles.mobileMenuWrapper}>
        <li>
          <NavLink
            to='/'
            onClick={handleMobileMenuClick}
            className={({ isActive }) => cx({ [styles.isMobaileActive]: isActive })}
          >
            <BiHomeAlt size='30px' />
            <span>백오피스 홈</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='userManage'
            onClick={handleMobileMenuClick}
            className={({ isActive }) => cx({ [styles.isMobaileActive]: isActive })}
          >
            <BiIdCard size='30px' />
            <span>회원 관리</span>
          </NavLink>
        </li>
      </ul>
    ) : null
  }, [isSidebarShow, setIsSidebarShow])

  return (
    <aside className={styles.sidebarContainer}>
      <nav>
        <ul className={styles.desktopMenu}>
          <li>
            <Link to='/'>
              <LogoImage className={styles.logo} />
            </Link>
          </li>
          <li>
            <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              <BiHomeAlt size='30px' className={styles.icon} />
              <span>백오피스 홈</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='userManage' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              <BiIdCard size='30px' className={styles.icon} />
              <span>회원 관리</span>
            </NavLink>
          </li>
        </ul>
        {mobileMenuBtnList}
      </nav>
    </aside>
  )
}

export default Sidebar
