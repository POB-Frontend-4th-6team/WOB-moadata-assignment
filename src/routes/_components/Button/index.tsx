import { ReactNode } from 'react'
import cx from 'classnames'

import styles from './button.module.scss'

interface IButtonProps {
  children: ReactNode
  size: 'small' | 'large'
  primary?: boolean
  onClick?: () => void
}

export const Button = ({ children, size, primary, onClick }: IButtonProps) => {
  return (
    <button type='button' className={cx(styles.button, styles[size], { [styles.primary]: primary })} onClick={onClick}>
      {children}
    </button>
  )
}
