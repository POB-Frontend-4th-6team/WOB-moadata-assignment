import StepRate from './StepRate'
import HeartRate from './HeartRate'
import styles from './userInfo.module.scss'
import { useLocation } from 'react-router-dom'
import { LinkMemberStateProps } from 'types/user'

const UserInfo = () => {
  const location = useLocation()

  const userInfo: LinkMemberStateProps = location.state as LinkMemberStateProps

  return (
    <>
      <section className={styles.container}>
        <h2>회원 상세 정보</h2>
        <div className={styles.infoContainer}>
          <dl>
            <div className={styles.infoBox}>
              <dt>로그인 ID</dt>
              <dd>{userInfo.user_id}</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>회원 번호</dt>
              <dd>{userInfo.user_seq}</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>가입일</dt>
              <dd>{userInfo.user_registerDate}</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>닉네임</dt>
              <dd>{userInfo.user_nickname}</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>성별</dt>
              <dd>{userInfo.user_gender}</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>생년월일</dt>
              <dd>{userInfo.user_birth}</dd>
            </div>
          </dl>
        </div>
      </section>
      <div className={styles.charts}>
        <HeartRate />
        <StepRate />
      </div>
    </>
  )
}

export default UserInfo
