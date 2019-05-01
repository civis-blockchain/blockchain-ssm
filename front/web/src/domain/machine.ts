export interface Machine {
  name: string
  transitions: Transition[]
}

export interface Transition {
  from: number
  to: number
  role: string
  action: string
}
