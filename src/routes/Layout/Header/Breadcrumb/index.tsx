import { NavLink, useLocation } from 'react-router-dom'
import { cx } from 'styles'

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
  console.log(location)

  const isPathsValid =
    (splitPathname.length === 1 && splitPathname[0] === '') || splitPathname.every((path) => !!PATH_NAMES[path])

  if (!isPathsValid) return null
  return (
    <ul className={styles.container}>
      {paths.map((path) => (
        <li key={`path-key-${path.accPath}`}>
          <NavLink className={({ isActive }) => cx({ [styles.active]: isActive })} to={path.accPath}>
            {path.name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default Breadcrumb
