import users from 'assets/jsons/user/member.json'

const getMemberSeq = (id: string) => {
  const findUser = users.find((value) => value.user_id === id)
  return findUser?.member_seq
}

export { getMemberSeq }
