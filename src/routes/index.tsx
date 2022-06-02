import { Routes, Route, Outlet } from 'react-router-dom'

import LoginPage from './Login'
import HomePage from './Home'
import UserManage from './UserManage'
import UserInfo from './UserInfo'
import NotFoundPage from './NotFoundPage'
import Layout from './Layout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<HomePage />} />
        <Route path='userManage' element={<Outlet />}>
          <Route path='' element={<UserManage />} />
          <Route path='userInfo' element={<UserInfo />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route path='login' element={<LoginPage />} />
    </Routes>
  )
}

export default App
