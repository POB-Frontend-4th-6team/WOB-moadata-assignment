import { Button } from 'routes/_components/Button'

import styles from './heartRate.module.scss'
import { Heartrate } from 'assets/svgs'

const HeartRate = () => {
  return (
    <section className={styles.heartContainer}>
      <h3>심박수</h3>
      <div className={styles.heartRate}>
        <div className={styles.chart}>
          {/* 차트 넣어주세용 */}
          heartRate
        </div>
        <div className={styles.info}>
          <p className={styles.title}>
            <Heartrate />
            <span>평균 82bpm</span>
          </p>
          <p className={styles.date}>2022-04-20</p>
        </div>
        <div className={styles.inquiry}>
          <div className={styles.datePicker}>
            <span>조회기간</span>
            <div className={styles.start}>{/* 시작일 */}</div>
            <span className={styles.sign}>~</span>
            <div className={styles.end}>{/* 끝 */}</div>

            <div className={styles.btns}>
              <Button size='small'>오늘</Button>
              <Button size='small'>1주일</Button>
              <Button size='small' primary>
                전체
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeartRate
