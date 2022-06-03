import users from 'assets/jsons/user/member.json'
import adminData from '../assets/jsons/user/admin.json'
import { filterUserWithIdAndDate, filterUserWithNumberAndDate, filterUserWithOnlyDate } from 'utils/user'

interface IProps {
  id: string | undefined
  number: number | undefined
  startDate: number
  endDate: number
}

const getMemberSeq = (id: string) => {
  const findUser = users.find((value) => value.user_id === id)
  return findUser?.member_seq
}

export const getUserInfoWithId = (id: string | undefined) => {
  const findUser = users.find((value) => value.user_id === id)
  return findUser
}

export const getMemberInfo = (props: IProps) => {
  if (props.id && !props.number) return filterUserWithIdAndDate(props.id, props.startDate, props.endDate)
  if (props.number && !props.id) return filterUserWithNumberAndDate(props.number, props.startDate, props.endDate)
  if (!props.number && !props.id) return filterUserWithOnlyDate(props.startDate, props.endDate)

  return []
}

const checkValidation = (id: string, password: string) => {
  const idArray = adminData.map((item) => item.user_id)
  const passwordArray = adminData.map((item) => item.password)

  let isValid = false
  idArray.forEach((item, index) => {
    if (item === id && password === passwordArray[index]) {
      isValid = true
    }
  })
  return isValid
}

export { getMemberSeq, checkValidation }
