import { useSetRecoilState } from 'recoil'

import { useMount } from 'hooks'
import { breadcrumb } from 'states/breadcrumb'

import styles from './home.module.scss'

const Home = () => {
  const setBreadcrumb = useSetRecoilState(breadcrumb)

  useMount(() => {
    setBreadcrumb({
      text: [{ text: '홈', disabled: true, href: '/' }],
    })
  })

  return (
    <section className={styles.container}>
      <h2>Home</h2>
    </section>
  )
}

export default Home
