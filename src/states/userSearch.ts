import dayjs from 'dayjs'
import { atom } from 'recoil'

interface IUserInputData {
  userId?: string | undefined
  userNumber?: number | undefined
  startDate: number
  endDate: number
}

const today = Number(dayjs(new Date()).format('YYYYMMDD'))

export const userInputDataState = atom<IUserInputData>({
  key: '#userInputDataState',
  default: { userId: undefined, userNumber: undefined, startDate: 20220101, endDate: today },
})
