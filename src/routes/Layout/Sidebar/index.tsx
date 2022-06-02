import { Link } from 'react-router-dom'
import styles from './sidebar.module.scss'
import { BiHomeAlt, BiIdCard } from 'react-icons/bi'
import { HamburgerMenu } from 'assets/svgs'
import { useMemo, useState } from 'react'

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleMobileClick = () => {
    setIsMobileOpen((prev) => !prev)
  }

  const mobileMenuBtnList = useMemo(() => {
    return isMobileOpen ? (
      <ul className={styles.mobileMenuWrapper}>
        <li>
          <Link to='/' onClick={handleMobileClick}>
            <BiHomeAlt size='30px' />
            백오피스 홈
          </Link>
        </li>
        <li>
          <Link to='userManage' onClick={handleMobileClick}>
            <BiIdCard size='30px' />
            회원 관리
          </Link>
        </li>
      </ul>
    ) : null
  }, [isMobileOpen])

  return (
    <aside className={styles.container}>
      <ul>
        <li className={styles.mobileMenu}>
          <button type='button' onClick={handleMobileClick}>
            <HamburgerMenu className={styles.hamburgerMenu} />
          </button>
        </li>
        <li className={styles.desktopMenu}>
          <Link to='/'>
            <BiHomeAlt size='30px' className={styles.icon} />
            <span>백오피스 홈</span>
          </Link>
        </li>
        <li className={styles.desktopMenu}>
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
