import React from "react"
import withConnect from "./withConnect";
interface Props {
  list: string[]
}
const Machines = (props: Props) => <div>{props.list}</div>

export default withConnect(Machines)
