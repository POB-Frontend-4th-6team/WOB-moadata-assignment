interface IHeartRate {
  seq: number
  member_seq: number
  avg_beat: number
  crt_ymdt: string
}

interface IStepRate {
  seq: number
  member_seq: number
  steps: number
  minutes: number
  distance: number
  calorie: number
  crt_ymdt: string
}

interface IRateObject {
  x: string
  y: number
}

export { IHeartRate, IStepRate, IRateObject }
