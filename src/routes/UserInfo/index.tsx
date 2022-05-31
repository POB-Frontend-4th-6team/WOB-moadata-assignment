import styles from './userInfo.module.scss'
import HeartRate from './HeartRate/index'

const UserInfo = () => {
  return (
    <div className={styles.container}>
      <HeartRate />
    </div>
  )
}

export default UserInfo
