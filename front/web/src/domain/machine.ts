import { Session } from "./session";

export interface Machine {
  name: string
  transitions: Transition[]
  sessions: Session[]
}

export interface Transition {
  from: number
  to: number
  role: string
  action: string
}
