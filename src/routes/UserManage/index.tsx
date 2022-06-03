import { useEffect, useState } from 'hooks'
import { useRecoilValue } from 'recoil'

import styles from './userManage.module.scss'
import Search from './Search'
import Result from './Result'

import { MemberStateProps } from 'types/user'
import { userInputDataState } from 'states/userSearch'
import { getMemberInfo } from 'services/user'

const UserManage = () => {
  const searchOptions = useRecoilValue(userInputDataState)

  const [member, setMember] = useState<MemberStateProps[]>([])

  const searchedMemberList = getMemberInfo({
    id: searchOptions.userId,
    number: searchOptions.userNumber,
    startDate: searchOptions.startDate,
    endDate: searchOptions.endDate,
  })

  useEffect(() => {
    setMember(searchedMemberList)
  }, [searchOptions])

  const countMember = member.length

  return (
    <section className={styles.container}>
      <h2>회원 관리</h2>
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <p>
        전체 총 <mark>{countMember}</mark> 명의 회원이 검색되었습니다.
      </p>
      <div className={styles.resultContainer}>
        <Result memberList={member} />
      </div>
    </section>
  )
}

export default UserManage
