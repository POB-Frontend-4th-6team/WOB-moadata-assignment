import { useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { useMount } from 'hooks'
import { getUserInfoWithId } from 'services/user'
import { breadcrumb } from 'states/breadcrumb'

import styles from './userInfo.module.scss'
import HeartRateChart from './Charts/HeartRateChart'
import StepRateChart from './Charts/StepRateChart'

const UserInfo = () => {
  const { userId } = useParams()
  const user = getUserInfoWithId(userId!)
  const setBreadcrumb = useSetRecoilState(breadcrumb)

  useMount(() => {
    setBreadcrumb({
      text: [
        { text: '홈', disabled: false, href: '/' },
        { text: '회원정보', disabled: false, href: 'userManage' },
        { text: '회원상세정보', disabled: true, href: 'userInfo' },
      ],
    })
  })

  return (
    <>
      {user && (
        <section className={styles.container}>
          <h2>회원 상세 정보</h2>
          <div className={styles.infoContainer}>
            <dl>
              <div className={styles.infoBox}>
                <dt>로그인 ID</dt>
                <dd>{user.nickname}</dd>
              </div>
              <div className={styles.infoBox}>
                <dt>회원 번호</dt>
                <dd>{user.member_seq}</dd>
              </div>
              <div className={styles.infoBox}>
                <dt>가입일</dt>
                <dd>{user.registered_date}</dd>
              </div>
              <div className={styles.infoBox}>
                <dt>닉네임</dt>
                <dd>{user.nickname}</dd>
              </div>
              <div className={styles.infoBox}>
                <dt>성별</dt>
                <dd>{user.gender}</dd>
              </div>
              <div className={styles.infoBox}>
                <dt>생년월일</dt>
                <dd>{user.birth}</dd>
              </div>
            </dl>
          </div>
        </section>
      )}
      <div className={styles.charts}>
        <HeartRateChart userId={user.user_id} />
        <StepRateChart userId={user.user_id} />
      </div>
    </>
  )
}

export default UserInfo
