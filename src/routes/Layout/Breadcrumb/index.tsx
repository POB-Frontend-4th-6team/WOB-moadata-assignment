import { Link, useLocation } from 'react-router-dom'
import styles from './breadcrumb.module.scss'

interface IPaths {
  accPath: string
  path: string
}

const Breadcrumb = () => {
  const location = useLocation()
  console.log(location)

  const paths = location.pathname.split('/').reduce((acc: IPaths[], path) => {
    const prevAccPath = acc?.[acc.length - 1]?.accPath ?? ''
    const accPath = `${prevAccPath}/${path}`
    path && acc.push({ accPath, path })

    return acc
  }, [])
  console.log(paths)

  return (
    <ul className={styles.container}>
      {paths.map((path) => (
        <li key={`path-key-${path}`}>
          <Link to={path.accPath}>{path.path}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Breadcrumb
