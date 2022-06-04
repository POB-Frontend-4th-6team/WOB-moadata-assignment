import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
