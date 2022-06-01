import styles from './result.module.scss'
import { removeTimeInDate } from 'utils/user'

import { Link } from 'react-router-dom'

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
  return (
    <tr className={styles.tableBody}>
      <td>{data.member_seq}</td>
      <td>{removeTimeInDate(data.registered_date)}</td>
      <td>{data.nickname}</td>
      <td>{data.user_id}</td>
      <td>{data.gender}</td>
      <td>{data.birth}</td>
      <td>
        <Link
          to='/userInfo'
          state={{
            user_seq: data.member_seq,
            user_nickname: data.nickname,
            user_id: data.user_id,
            user_gender: data.gender,
            user_birth: data.birth,
            user_registerDate: removeTimeInDate(data.registered_date),
          }}
        >
          <button type='button'>관리</button>
        </Link>
      </td>
    </tr>
  )
}

export default Result
