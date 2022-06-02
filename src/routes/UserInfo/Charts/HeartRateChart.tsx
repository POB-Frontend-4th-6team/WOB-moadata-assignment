import { VictoryChart, VictoryLine, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory'

import { useEffect, useState } from 'hooks'
import { getPeriodRateData } from 'services/health'
import { IChartObject } from 'types/chart.d'
import { Heartrate } from 'assets/svgs'

import styles from './chart.module.scss'
import SearchDateRange from 'routes/_components/SearchDateRange'

const HeartRateChart = () => {
  const [chartData, setChartData] = useState<IChartObject[]>([])
  const [weeks, setWeeks] = useState<string[]>(['2022-02-26', '2022-04-24'])

  useEffect(() => {
    setChartData(getPeriodRateData(weeks, 'member136', 'heart'))
  }, [weeks])

  return (
    <section className={styles.container}>
      <h3>심박수</h3>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <VictoryChart
            width={800}
            height={300}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.y}bpm`}
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
            <VictoryAxis fixLabelOverlap />
            <VictoryAxis dependentAxis tickValues={[60, 82, 105, 127, 150]} />
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' },
              }}
              interpolation='natural'
              data={chartData}
            />
          </VictoryChart>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>
            <Heartrate width={20} height={20} />
            <span>평균 82bpm</span>
          </p>
          <p className={styles.date}>2022-04-20</p>
        </div>
        <SearchDateRange setWeeks={setWeeks} />
      </div>
    </section>
  )
}

export default HeartRateChart
