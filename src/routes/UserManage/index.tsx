import { useEffect, useState } from 'hooks'

import styles from './userManage.module.scss'
import Search from './Search'
import Result from './Result'

import { MemberStateProps } from 'types/user'
import { userInputDataState } from 'states/userSearch'
import { getMemberInfo } from 'services/user'
import { useRecoilValue } from 'recoil'

const UserManage = () => {
  const [member, setMember] = useState<MemberStateProps[]>([])

  const searchOptions = useRecoilValue(userInputDataState)

  const searchedMemberList = getMemberInfo({
    id: searchOptions.userId,
    number: searchOptions.userNumber,
    startDate: searchOptions.startDate,
    endDate: searchOptions.endDate,
  })

  useEffect(() => {
    setMember(searchedMemberList)
  }, [searchOptions])

  const Results: JSX.Element[] = member.map((data) => <Result data={data} key={`userId_${data.nickname}`} />)

  return (
    <div className={styles.container}>
      <h2>UserManage</h2>
      <Search />
      <table>
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
        <tbody>{Results}</tbody>
      </table>
    </div>
  )
}

export default UserManage
