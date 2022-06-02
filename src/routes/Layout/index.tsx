import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'
import Sidebar from './Sidebar'
import Header from './Header'
import Breadcrumb from './Header/Breadcrumb'

const Layout = () => {
  return (
    <div className={styles.app}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
