import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import stepData from 'assets/jsons/steprate/steprate_136.json'

import styles from './stepRate.module.scss'
import { useEffect, useState } from 'hooks'
import dayjs from 'dayjs'

interface ChartProps {
  x: string
  y: number
}

const StepRate = () => {
  const [chartData, setChartData] = useState<ChartProps[]>([])
  const weeks = [
    '2022-03-08',
    '2022-04-13',
    '2022-04-14',
    '2022-04-15',
    '2022-04-16',
    '2022-04-17',
    '2022-04-18',
    '2022-04-19',
    '2022-04-20',
    '2022-04-21',
    '2022-04-22',
    '2022-04-23',
    '2022-04-24',
  ]
  const values: number[] = []

  useEffect(() => {
    values.splice(0, values.length)
    weeks.forEach((week) => {
      let maxStep = -1
      stepData.forEach((data) => {
        if (dayjs(week).isSame(dayjs(data.crt_ymdt).format('YYYY-MM-DD')) && data.steps > maxStep) {
          maxStep = data.steps
        }
      })
      values.push(maxStep === -1 ? 0 : maxStep)
    })

    setChartData(
      weeks.map((week, idx) => {
        return {
          x: week,
          y: values[idx],
        }
      })
    )
  }, [])

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
          barWidth={30}
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
