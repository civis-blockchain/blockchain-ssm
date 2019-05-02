// {
//   "ssm": "iterop-sign-document",
//   "session": "iterop-sign-doc-10",
//   "iteration": 3,
//   "roles": {
//     "iterop-sign-doc": "Signer"
//   },
//   "current": 0,
//   "origin": {
//     "from": 0,
//     "to": 0,
//     "role": "Signer",
//     "action": "Update"
//   },
//   "public": "21ea53f80c761ccc8132a7cdbfa8958d6ef19cba0403c0aa117cd6175eabd1aa"
// }

export interface Session {
  ssm: string
  session: string
  iteration: number
  current: number
  roles: Map<string, string>
  origin: Origin
  public: string
}

export interface Origin {
  from: number
  to: number
  role: string
  action: string
}
