import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'
import Sidebar from './Sidebar'
import Header from './Header'
import Breadcrumb from './Breadcrumb'
import { useState } from 'react'
import { cx } from 'styles'

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebarOpen = () => {
    setShowSidebar((prev) => !prev)
  }
  return (
    <div className={styles.app}>
      <Header />
      <main className={cx({ [styles.showSidebar]: showSidebar })}>
        <button className={styles.sidebarButton} type='button' onClick={toggleSidebarOpen}>
          사이드바 열기
        </button>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
        <div className={styles.pageContainer}>
          <Breadcrumb />
          <div className={styles.pageContents}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout
