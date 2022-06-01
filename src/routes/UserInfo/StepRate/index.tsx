import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import { useEffect, useState } from 'hooks'
import { getPeriodRateData } from 'services/health'

import styles from './stepRate.module.scss'

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
    <div className={styles.container}>
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
  )
}

export default StepRate
