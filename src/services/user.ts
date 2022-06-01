import users from 'assets/jsons/user/member.json'
import { filterUserWithIdAndDate, filterUserWithNumberAndDate } from 'utils/user'

interface Props {
  id: string | undefined
  number: number | undefined
  startDate: number
  endDate: number
}

const getMemberSeq = (id: string) => {
  const findUser = users.find((value) => value.user_id === id)
  return findUser?.member_seq
}

export { getMemberSeq }

export const getMemberInfo = (props: Props) => {
  if (props.id && !props.number) return filterUserWithIdAndDate(props.id, props.startDate, props.endDate)
  if (props.number && !props.id) return filterUserWithNumberAndDate(props.number, props.startDate, props.endDate)

  return []
}
