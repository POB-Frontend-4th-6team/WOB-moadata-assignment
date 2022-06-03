import { Link } from 'react-router-dom'

import { useRecoilValue } from 'recoil'
import { breadcrumb } from 'states/breadcrumb'

import styles from './breadcrumb.module.scss'

const Breadcrumb = () => {
  const getBreadcrumb = useRecoilValue(breadcrumb)

  return (
    <ul className={styles.container}>
      {getBreadcrumb.text.map((item) => (
        <li key={item.text}>{item.disabled ? <span>{item.text}</span> : <Link to={item.href}>{item.text}</Link>}</li>
      ))}
    </ul>
  )
}

export default Breadcrumb
