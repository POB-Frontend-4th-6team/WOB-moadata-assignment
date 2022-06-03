import styles from './result.module.scss'
import { removeTimeInDate } from 'utils/user'

import { Link } from 'react-router-dom'
import { MemberStateProps } from 'types/user'

interface Props {
  memberList: MemberStateProps[]
}

const Result = ({ memberList }: Props) => {
  const TableBody: JSX.Element[] = memberList.map((member, idx) => {
    const key = `member-${idx}`
    const { member_seq: memberSeq, registered_date: registeredDate, nickname, user_id: userId, gender, birth } = member

    return (
      <tr key={key} className={styles.tableBody}>
        <td>{memberSeq}</td>
        <td>{removeTimeInDate(registeredDate)}</td>
        <td>{nickname}</td>
        <td>{userId}</td>
        <td>{gender}</td>
        <td>{birth}</td>
        <td>
          <Link
            to='userInfo'
            state={{
              user_seq: memberSeq,
              user_nickname: nickname,
              user_id: userId,
              user_gender: gender,
              user_birth: birth,
              user_registerDate: removeTimeInDate(registeredDate),
            }}
          >
            <button type='button' className={styles.linkButton}>
              관리
            </button>
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <div className={styles.tableContainer}>
      <table cellSpacing='0' cellPadding='0'>
        <thead>
          <tr>
            <th>회원번호</th>
            <th>가입일</th>
            <th>닉네임</th>
            <th>로그인 ID</th>
            <th>성별</th>
            <th>생년월일</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>
          {TableBody}
          {memberList.length < 5 && <tr className={styles.lastTr} />}
        </tbody>
      </table>
    </div>
  )
}

export default Result
