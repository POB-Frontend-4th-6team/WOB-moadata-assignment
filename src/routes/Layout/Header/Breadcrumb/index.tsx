import { Link, useLocation } from 'react-router-dom'

import styles from './breadcrumb.module.scss'
import Item from './Item'

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

  const splitPathname = location.pathname.split('/').filter((path, i) => i !== 0)

  const paths = splitPathname.reduce(
    (acc: IPaths[], path) => {
      const prevAccPath = acc[acc.length - 1].accPath
      const accPath = `${prevAccPath}/${path}`
      const name = PATH_NAMES?.[path]
      name && acc.push({ accPath, name })

      return acc
    },
    [{ accPath: '', name: '홈' }]
  )

  const isPathsValid =
    (splitPathname.length === 1 && splitPathname[0] === '') || splitPathname.every((path) => !!PATH_NAMES[path])

  if (!isPathsValid) return null
  return (
    <ul className={styles.container}>
      {paths.map((path, i) => (
        <Item isLast={i === paths.length - 1} path={path} key={`breadcrumb-item-${path.accPath}`} />
      ))}
    </ul>
  )
}

export default Breadcrumb
