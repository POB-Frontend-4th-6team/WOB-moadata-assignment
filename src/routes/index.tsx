import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import store from 'store'

import LoginPage from './Login'
import HomePage from './Home'
import UserManage from './UserManage'
import UserInfo from './UserInfo'
import NotFoundPage from './NotFoundPage'
import Layout from './Layout'
import { useEffect } from 'react'

const App = () => {
  const isLogin = !!sessionStorage.getItem('admin')
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin && !store.get('admin')) navigate('login')
  }, [isLogin, navigate])

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
