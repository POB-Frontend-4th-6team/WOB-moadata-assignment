import Search from './Search'
import styles from './userManage.module.scss'

const UserManage = () => {
  return (
    <section className={styles.container}>
      <h2>UserManage</h2>
      <Search />
    </section>
  )
}

export default UserManage
