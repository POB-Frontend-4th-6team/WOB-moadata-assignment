import { Link } from 'react-router-dom'
import styles from './sidebar.module.scss'

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <Link to='/'>백오피스 홈</Link>
      <Link to='userManage'>회원 관리</Link>
    </aside>
  )
}

export default Sidebar
