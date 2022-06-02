import users from 'assets/jsons/user/member.json'
import { getRegExp } from 'korean-regexp'

interface Props {
  member_seq: number
  user_id: string
  nickname: string
  gender: string
  birth: string
  registered_date: string
}

export const stringDateToNumber = (userDate: string) => {
  const removeTime = userDate.slice(0, 10)
  const dateToNumber = Number(removeTime.split('-').join(''))
  return dateToNumber
}

const dateIncludeUsersArray = (props: Props[], startDate: number, endDate: number) => {
  const dateIncludeUsers = props.filter(
    (user) =>
      stringDateToNumber(user.registered_date) >= startDate && stringDateToNumber(user.registered_date) <= endDate
  )

  return dateIncludeUsers
}

export const filterUserWithIdAndDate = (id: string, startDate: number, endDate: number) => {
  const inputRegex = getRegExp(id, {
    fuzzy: true,
  })

  const idIncludeUsers = users.filter((user) => user.user_id.match(inputRegex))

  const includeDateArray = dateIncludeUsersArray(users, startDate, endDate)

  const result = idIncludeUsers.filter((ids) => includeDateArray.find((date) => ids.member_seq === date.member_seq))

  return result
}

export const filterUserWithNumberAndDate = (number: number, startDate: number, endDate: number) => {
  const numberIncludeUsers = users.filter((user) => user.member_seq.toString().includes(number.toString()))

  const includeDateArray = dateIncludeUsersArray(users, startDate, endDate)

  const result = numberIncludeUsers.filter((ids) => includeDateArray.find((date) => ids.member_seq === date.member_seq))

  return result
}

export const filterUserWithOnlyDate = (startDate: number, endDate: number) => {
  const includeDateArray = dateIncludeUsersArray(users, startDate, endDate)

  return includeDateArray
}

export const removeTimeInDate = (date: string) => {
  return date.slice(0, 10)
}

// if (startDate <= dateToNumber <= endDate) return dateToNumber
