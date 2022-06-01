import styles from './userManage.module.scss'
import Result from './Result'

const DATAS = [
  { registerNumber: 1, registerDate: '2018.03.17', loginId: 'iamchho', gender: '남', birthday: '1995.12.01' },
  { registerNumber: 2, registerDate: '2018.10.21', loginId: 'rowastudy', gender: '여', birthday: '1997.1.20' },
  { registerNumber: 3, registerDate: '2018.08.16', loginId: 'choco123', gender: '남', birthday: '1997.3.17' },
]

const UserManage = () => {
  const Results: JSX.Element[] = DATAS.map((data) => <Result data={data} key={data.loginId} />)

  return <div className={styles.container}>{Results}</div>
}

export default UserManage
