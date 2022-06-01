import styles from './heartRate.module.scss'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory'
import jsonData from 'assets/jsons/heartrate/heartrate_136.json'

const HeartRate = () => {
  const data = jsonData.map((e) => ({ x: e.crt_ymdt, y: e.avg_beat }))

  // console.log(data)

  return (
    <div className={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${datum.y}bpm`}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{
                  stroke: 'black',
                  fill: 'white',
                }}
                flyoutPadding={10}
              />
            }
          />
        }
        width={1000}
      >
        <VictoryAxis fixLabelOverlap />
        <VictoryAxis dependentAxis tickValues={[60, 82, 105, 127, 150]} />
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' },
          }}
          interpolation='natural'
          data={data}
        />
      </VictoryChart>
    </div>
  )
}

export default HeartRate
