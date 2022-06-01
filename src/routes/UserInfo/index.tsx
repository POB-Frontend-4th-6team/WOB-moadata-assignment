import styles from './userInfo.module.scss'

const UserInfo = () => {
  return (
    <div className={styles.container}>
      <h1>회원 상세 정보</h1>
      <section className={styles.infoContainer}>
        <dl>
          <div>
            <dt>로그인 ID</dt>
            <dd>member136</dd>
          </div>
          <div>
            <dt>회원 번호</dt>
            <dd>136</dd>
          </div>
          <div>
            <dt>가입일</dt>
            <dd>2020-04-16</dd>
          </div>
          <div>
            <dt>닉네임</dt>
            <dd>모아데이터1</dd>
          </div>
          <div>
            <dt>성별</dt>
            <dd>남</dd>
          </div>
          <div>
            <dt>생년월일</dt>
            <dd>1998-02-22</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}

export default UserInfo
