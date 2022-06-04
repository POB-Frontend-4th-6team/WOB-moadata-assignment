import { atom } from 'recoil'

interface IBreadcrumbText {
  text?: string
  disabled: boolean
  href: string
}

export interface IBreadcrumb {
  text: IBreadcrumbText[]
}

export const breadcrumb = atom<IBreadcrumb>({
  key: '#breadcrumb',
  default: {
    text: [
      {
        text: '',
        disabled: true,
        href: '',
      },
    ],
  },
})
