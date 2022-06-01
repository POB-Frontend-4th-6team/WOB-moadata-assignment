import styles from './result.module.scss'

import { useNavigate } from 'react-router-dom'

interface Props {
  data: {
    member_seq: number
    nickname: string
    user_id: string
    gender: string
    birth: string
    registered_date: string
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
          <td>{data.member_seq}</td>
          <td>{data.registered_date}</td>
          <td>{data.user_id}</td>
          <td>{data.gender}</td>
          <td>{data.birth}</td>
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
