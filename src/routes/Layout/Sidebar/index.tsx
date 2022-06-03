import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { sidebarDrawer } from 'states/sidebarDrawer'
import { BiHomeAlt, BiIdCard } from 'react-icons/bi'
import { LogoImage } from 'assets/svgs'
import styles from './sidebar.module.scss'

const Sidebar = () => {
  const [isSidebarShow, setIsSidebarShow] = useRecoilState(sidebarDrawer)

  const mobileMenuBtnList = useMemo(() => {
    const handleMobileMenuClick = () => {
      setIsSidebarShow((prev) => !prev)
    }

    return isSidebarShow ? (
      <ul className={styles.mobileMenuWrapper}>
        <li>
          <Link to='/' onClick={handleMobileMenuClick}>
            <BiHomeAlt size='30px' />
            <span>백오피스 홈</span>
          </Link>
        </li>
        <li>
          <Link to='userManage' onClick={handleMobileMenuClick}>
            <BiIdCard size='30px' />
            <span>회원 관리</span>
          </Link>
        </li>
      </ul>
    ) : null
  }, [isSidebarShow, setIsSidebarShow])

  return (
    <aside className={styles.sidebarContainer}>
      <ul className={styles.desktopMenu}>
        <li>
          <Link to='/'>
            <LogoImage className={styles.logo} />
          </Link>
        </li>
        <li>
          <Link to='/'>
            <BiHomeAlt size='30px' className={styles.icon} />
            <span>백오피스 홈</span>
          </Link>
        </li>
        <li>
          <Link to='userManage'>
            <BiIdCard size='30px' className={styles.icon} />
            <span>회원 관리</span>
          </Link>
        </li>
      </ul>
      {mobileMenuBtnList}
    </aside>
  )
}

export default Sidebar
