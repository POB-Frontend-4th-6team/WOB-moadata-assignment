import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'
import LoginPage from './Login'
import HomePage from './Home'
import UserManage from './UserManage'
import UserInfo from './UserInfo'
import NotFoundPage from './NotFoundPage'
import Sidebar from './Sidebar'
import Header from './Header'
import Breadcrumb from './Breadcrumb'

const App = () => {
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
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='userManage' element={<UserManage />} />
              <Route path='userInfo' element={<UserInfo />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
