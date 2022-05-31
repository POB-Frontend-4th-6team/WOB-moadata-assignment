import styles from './header.module.scss'

const Header = () => {
  return (
    <header>
      <p>백오피스</p>
      <div className={styles.userMenus}>
        <p>admin님</p>
        <button type='button'>로그아웃</button>
      </div>
    </header>
  )
}

export default Header
