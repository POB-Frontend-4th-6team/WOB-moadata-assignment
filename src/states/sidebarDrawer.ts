import { atom } from 'recoil'

export const sidebarDrawer = atom<boolean>({
  key: '#sidebarDrawer',
  default: false,
})
