import styles from './userManage.module.scss'
import Result from './Result'
import { getMemberInfo } from 'services/user'
import { useMount, useState } from 'hooks'
import { MemberStateProps } from 'types/user'

const UserManage = () => {
  const [member, setMember] = useState<MemberStateProps[]>([])

  useMount(() => {
    const searchedMemberList = getMemberInfo({ id: undefined, number: 136, startDate: 20220401, endDate: 20220514 })
    console.log('searchedMemberList', searchedMemberList)
    setMember(searchedMemberList)
  })

  const Results: JSX.Element[] = member.map((data) => <Result data={data} key={`userId_${data.nickname}`} />)

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>회원번호</th>
            <th>가입일</th>
            <th>로그인 ID</th>
            <th>성별</th>
            <th>생년월일</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>{Results}</tbody>
      </table>
    </div>
  )
}

export default UserManage
