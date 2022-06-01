import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'
import Sidebar from './Sidebar'
import Header from './Header'
import Breadcrumb from './Breadcrumb'

const Layout = () => {
  return (
    <div className={styles.app}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <main>
        <Header />
        <Breadcrumb />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
