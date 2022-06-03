import styles from './result.module.scss'
import { removeTimeInDate } from 'utils/user'

import { Link } from 'react-router-dom'
import { MemberStateProps } from 'types/user'

interface IProps {
  memberList: MemberStateProps[]
}

const Result = ({ memberList }: IProps) => {
  const TableBody: JSX.Element[] = memberList.map((member, idx) => {
    const key = `member-${idx}`

    return (
      <tr key={key} className={styles.tableBody}>
        <td>{member.member_seq}</td>
        <td>{removeTimeInDate(member.registered_date)}</td>
        <td>{member.nickname}</td>
        <td>{member.user_id}</td>
        <td>{member.gender}</td>
        <td>{member.birth}</td>
        <td>
          <Link to={`userInfo/${member.user_id}`}>
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
