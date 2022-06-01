import styles from './result.module.scss'

import { useNavigate } from 'react-router-dom'

interface Props {
  data: {
    registerNumber: number
    registerDate: string
    loginId: string
    gender: string
    birthday: string
  }
}

const Result = ({ data }: Props) => {
  const navigate = useNavigate()

  const setUserAtomAndNavigate = () => {
    navigate('/userInfo')
  }

  return (
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
      <tbody>
        <tr className={styles.tableBody}>
          <td>{data.registerNumber}</td>
          <td>{data.registerDate}</td>
          <td>{data.loginId}</td>
          <td>{data.gender}</td>
          <td>{data.birthday}</td>
          <td>
            <button type='button' onClick={setUserAtomAndNavigate}>
              관리
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Result
