import styles from './heartRate.module.scss'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'
import jsonData from 'assets/jsons/heartrate_136_0226_유령회원1번.json'

const HeartRate = () => {
  return (
    <div className={styles.container}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' },
          }}
          range={[60, 150]}
          interpolation='natural'
          data={[
            { x: 1, y: 70 },
            { x: 2, y: 70 },
            { x: 3, y: 80 },
            { x: 4, y: 100 },
            { x: 5, y: 120 },
          ]}
        />
      </VictoryChart>
    </div>
  )
}

export default HeartRate
