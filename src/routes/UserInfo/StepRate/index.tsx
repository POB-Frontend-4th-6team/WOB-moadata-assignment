import { Button } from 'routes/_components/Button'

import { Step } from 'assets/svgs'
import styles from './stepRate.module.scss'

const StepRate = () => {
  return (
    <section className={styles.stepContainer}>
      <h3>걸음수</h3>
      <div className={styles.stepChart}>
        <div className={styles.chart}>
          {/* 차트 넣어주세용 */}
          stepChart
        </div>
        <div className={styles.info}>
          <p className={styles.title}>
            <Step />
            <span>총 13,230 걸음</span>
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

export default StepRate
