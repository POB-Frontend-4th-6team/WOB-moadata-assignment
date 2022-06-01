import users from 'assets/jsons/user/member.json'
import adminData from '../assets/jsons/user/admin.json'

const getMemberSeq = (id: string) => {
  const findUser = users.find((value) => value.user_id === id)
  return findUser?.member_seq
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
