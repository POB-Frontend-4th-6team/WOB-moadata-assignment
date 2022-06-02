import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { sidebarDrawer } from 'states/sidebarDrawer'
import { BiHomeAlt, BiIdCard } from 'react-icons/bi'
import { SmallLogo } from 'assets/svgs'
import styles from './sidebar.module.scss'

const Sidebar = () => {
  const isSidebarShow = useRecoilValue(sidebarDrawer)

  const mobileMenuBtnList = useMemo(() => {
    return isSidebarShow ? (
      <ul className={styles.mobileMenuWrapper}>
        <li>
          <Link to='/'>
            <BiHomeAlt size='30px' />
            <span>백오피스 홈</span>
          </Link>
        </li>
        <li>
          <Link to='userManage'>
            <BiIdCard size='30px' />
            <span>회원 관리</span>
          </Link>
        </li>
      </ul>
    ) : null
  }, [isSidebarShow])

  return (
    <aside className={styles.sidebarContainer}>
      <ul className={styles.desktopMenu}>
        <li>
          <Link to='/'>
            <SmallLogo className={styles.logo} />
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
