import { Link } from 'react-router-dom'
import styles from './sidebar.module.scss'
import { BiHomeAlt, BiIdCard } from 'react-icons/bi'

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <ul>
        <li>
          <Link to='/'>
            <BiHomeAlt size='30px' />
            백오피스 홈
          </Link>
        </li>
        <li>
          <Link to='userManage'>
            <BiIdCard size='30px' />
            회원 관리
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
