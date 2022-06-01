import { atom } from 'recoil'

interface IDateRange {
  startDate: string
  endDate: string
}

export const searchedDateRangeState = atom<IDateRange>({
  key: '#searchedDateRangeState',
  default: { startDate: '전체', endDate: '전체' },
})

export const searchedUserId = atom<string>({
  key: '#searchedUserId',
  default: '전체',
})
export const searchedUserNumber = atom<number>({
  key: '#searchedUserNumber',
  default: 1,
})
