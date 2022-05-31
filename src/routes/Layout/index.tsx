import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'
import Sidebar from '../Sidebar'
import Header from '../Header'
import Breadcrumb from '../Breadcrumb'

const Layout = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
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
