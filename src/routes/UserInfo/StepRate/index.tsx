import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import { useEffect, useState } from 'hooks'
import { getPeriodRateData } from 'services/health'
import { Button } from 'routes/_components/Button'
import SearchDateRange from 'routes/_components/SearchDateRange'

import styles from './stepRate.module.scss'
import { Step } from 'assets/svgs'

interface ChartProps {
  x: string
  y: number
}

const StepRate = () => {
  const [chartData, setChartData] = useState<ChartProps[]>([])
  const [weeks, setWeeks] = useState<string[]>(['2022-02-26', '2022-04-24'])

  useEffect(() => {
    setChartData(getPeriodRateData(weeks, 'member136', 'step'))
  }, [weeks])

  return (
    <section className={styles.stepContainer}>
      <h3>걸음수</h3>
      <div className={styles.stepChart}>
        <div className={styles.chart}>
          <VictoryChart
            height={300}
            width={1000}
            domainPadding={20}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.y} 보`}
                labelComponent={
                  <VictoryTooltip
                    style={{ fill: 'white', fontSize: 14 }}
                    flyoutStyle={{ fill: '#3a474e' }}
                    flyoutHeight={40}
                    flyoutPadding={15}
                  />
                }
              />
            }
          >
            <VictoryAxis dependentAxis />
            <VictoryAxis fixLabelOverlap style={{ tickLabels: { fontSize: 16 } }} />
            <VictoryBar
              data={chartData}
              animate={{
                duration: 0,
                onLoad: { duration: 100 },
              }}
              style={{
                data: {
                  fill: '#fe612c',
                },
                labels: {
                  fontSize: 16,
                },
              }}
            />
          </VictoryChart>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>
            <Step />
            <span>총 13,230 걸음</span>
          </p>
          <p className={styles.date}>2022-04-20</p>
        </div>
        <SearchDateRange setWeeks={setWeeks} />
      </div>
    </section>
  )
}

export default StepRate
