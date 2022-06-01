import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import { useEffect, useMemo, useState } from 'hooks'
import { getPeriodRateData, getTodayRateData } from 'services/health'
import SearchDateRange from 'routes/_components/SearchDateRange'

import styles from './stepRate.module.scss'
import { Step } from 'assets/svgs'

interface ChartProps {
  x: string
  y: number
}

const StepRate = () => {
  const [chartData, setChartData] = useState<ChartProps[]>([])
  const [weeks, setWeeks] = useState<string[]>([])
  const total = useMemo(() => chartData.reduce((prev, cur) => prev + cur.y, 0), [chartData])
  const date = useMemo(() => {
    if (chartData.length === 1) return chartData[0].x
    if (chartData.length === 0) return ''
    return `${chartData[0].x} ~ ${chartData[chartData.length - 1].x}`
  }, [chartData])

  useEffect(() => {
    if (weeks.length && weeks[0] === weeks[1]) setChartData(getTodayRateData(weeks, 'member136', 'step'))
    else setChartData(getPeriodRateData(weeks, 'member136', 'step'))
  }, [weeks])

  return (
    <section className={styles.stepContainer}>
      <h3>걸음수</h3>
      <div className={styles.stepChart}>
        <div className={styles.chart}>
          <VictoryChart
            height={300}
            width={800}
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
                responsive={false}
              />
            }
          >
            <VictoryAxis dependentAxis tickFormat={(y) => (y < 1 ? '0' : `${y / 1000}k`)} />
            <VictoryAxis fixLabelOverlap style={{ tickLabels: { fontSize: 16 } }} />
            <VictoryBar
              data={chartData}
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
            <span>총 {total.toLocaleString()} 걸음</span>
          </p>
          <p className={styles.date}>{date}</p>
        </div>
        <SearchDateRange setWeeks={setWeeks} />
      </div>
    </section>
  )
}

export default StepRate
