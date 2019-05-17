import React from "react";
import withConnect from "./withConnect";
import Paper from "@material-ui/core/es/Paper";
import { Machine } from "../../domain/machine";
import MachineList from "../../components/Machine/MachineList";

interface Props {
  list: Machine[],
  goToMachine: (machine: Machine) => void;
}

interface State {
  machineSelected: Machine | null
  loading: boolean
}

class Machines extends React.Component<Props, State> {
  state = { machineSelected: null, loading: false };

  render() {
    return <React.Fragment>
      <Paper>
        <MachineList list={this.props.list} onMachineClick={this.props.goToMachine}/>
      </Paper>
    </React.Fragment>;
  }

  private detailsOpen = (machine: Machine) => () => {
    this.props.goToMachine(machine);
  };

}

export default withConnect(Machines);
