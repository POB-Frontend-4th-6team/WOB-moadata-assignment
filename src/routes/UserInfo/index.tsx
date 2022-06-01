import StepRate from './StepRate'
import styles from './userInfo.module.scss'
import { useLocation } from 'react-router-dom'
import { LinkMemberStateProps } from 'types/user'

const UserInfo = () => {
  const location = useLocation()

  const userInfo: LinkMemberStateProps = location.state as LinkMemberStateProps

  console.log(userInfo)

  return (
    <div className={styles.container}>
      <h1>회원 상세 정보</h1>
      <section className={styles.infoContainer}>
        <dl>
          <div>
            <dt>로그인 ID</dt>
            <dd>{userInfo.user_id}</dd>
          </div>
          <div>
            <dt>회원 번호</dt>
            <dd>{userInfo.user_seq}</dd>
          </div>
          <div>
            <dt>가입일</dt>
            <dd>{userInfo.user_registerDate}</dd>
          </div>
          <div>
            <dt>닉네임</dt>
            <dd>{userInfo.user_nickname}</dd>
          </div>
          <div>
            <dt>성별</dt>
            <dd>{userInfo.user_gender}</dd>
          </div>
          <div>
            <dt>생년월일</dt>
            <dd>{userInfo.user_birth}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}

export default UserInfo
