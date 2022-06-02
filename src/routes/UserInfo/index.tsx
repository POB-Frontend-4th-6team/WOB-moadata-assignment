import StepRate from './StepRate'
import HeartRate from './HeartRate'
import styles from './userInfo.module.scss'

const UserInfo = () => {
  return (
    <>
      <section className={styles.container}>
        <h2>회원 상세 정보</h2>
        <div className={styles.infoContainer}>
          <dl>
            <div className={styles.infoBox}>
              <dt>로그인 ID</dt>
              <dd>member136</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>회원 번호</dt>
              <dd>136</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>가입일</dt>
              <dd>2020-04-16</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>닉네임</dt>
              <dd>모아데이터1</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>성별</dt>
              <dd>남</dd>
            </div>
            <div className={styles.infoBox}>
              <dt>생년월일</dt>
              <dd>1998-02-22</dd>
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
