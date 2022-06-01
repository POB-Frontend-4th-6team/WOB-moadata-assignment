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
  )
}

export default Result
