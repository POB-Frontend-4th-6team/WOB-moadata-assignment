import { Link, useLocation } from 'react-router-dom'
import styles from './breadcrumb.module.scss'

interface IPaths {
  accPath: string
  name: string
}
interface IPATH_NAMES {
  [key: string]: string
}

const PATH_NAMES: IPATH_NAMES = { userManage: '회원 관리', userInfo: '회원 정보' }

const Breadcrumb = () => {
  const location = useLocation()

  const paths = location.pathname.split('/').reduce(
    (acc: IPaths[], path) => {
      const prevAccPath = acc?.[acc.length - 1]?.accPath ?? ''
      const accPath = `${prevAccPath}/${path}`
      const name = PATH_NAMES?.[path]

      name && acc.push({ accPath, name })

      return acc
    },
    [{ accPath: '/', name: '홈' }]
  )

  return (
    <ul className={styles.container}>
      {paths.map((path) => (
        <li key={`path-key-${path}`}>
          <Link to={path.accPath}>{path.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Breadcrumb
