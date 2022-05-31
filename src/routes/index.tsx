import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'
import LoginPage from './Login'
import HomePage from './Home'
import UserManage from './UserManage'
import UserInfo from './UserInfo'
import NotFoundPage from './NotFoundPage'

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='userManage' element={<UserManage />} />
        <Route path='userInfo' element={<UserInfo />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
