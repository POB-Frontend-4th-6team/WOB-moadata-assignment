import { Link } from 'react-router-dom'

interface IProps {
  isLast: boolean
  path: { accPath: string; name: string }
}

const Item = ({ isLast, path }: IProps) => {
  return (
    <li key={`path-key-${path.accPath}`}>
      {isLast ? <span>{path.name}</span> : <Link to={path.accPath}>{path.name}</Link>}
    </li>
  )
}

export default Item
