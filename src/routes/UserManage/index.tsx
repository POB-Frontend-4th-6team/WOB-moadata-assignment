import { useEffect, useMount, useState, useMemo } from 'hooks'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { MemberStateProps } from 'types/user'
import { userInputDataState } from 'states/userSearch'
import { getMemberInfo } from 'services/user'
import { breadcrumb } from 'states/breadcrumb'

import styles from './userManage.module.scss'
import Search from './Search'
import Result from './Result'

const UserManage = () => {
  const searchOptions = useRecoilValue(userInputDataState)
  const setBreadcrumb = useSetRecoilState(breadcrumb)
  const [member, setMember] = useState<MemberStateProps[]>([])

  const searchedMemberList = useMemo(
    () =>
      getMemberInfo({
        id: searchOptions.userId,
        number: searchOptions.userNumber,
        startDate: searchOptions.startDate,
        endDate: searchOptions.endDate,
      }),
    [searchOptions.endDate, searchOptions.startDate, searchOptions.userId, searchOptions.userNumber]
  )

  useMount(() => {
    setBreadcrumb({
      text: [
        { text: '홈', disabled: false, href: '/' },
        { text: '회원정보', disabled: true, href: 'userManage' },
      ],
    })
  })

  useEffect(() => {
    setMember(searchedMemberList)
  }, [searchedMemberList])

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
