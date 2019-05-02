import React from "react";
import withConnect from "./withConnect";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import Paper from "@material-ui/core/es/Paper";
import MachineDetails from "./MachineDetails";
import { Machine } from "../../domain/machine";

interface Props {
  list: Machine[]
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Nb Session</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.list.map(machine => (
              <TableRow key={machine.name} onClick={this.detailsOpen(machine)}>
                <TableCell component="th" scope="row">
                  {machine.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {machine.sessions.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <MachineDetails loading={this.state.loading} machine={this.state.machineSelected} onClose={this.detailsClose}/>
    </React.Fragment>;
  }

  detailsClose = () => {
    this.setState({ machineSelected: null });
  };

  private detailsOpen = (machine: Machine) => () => {
    this.setState({ machineSelected: null, loading: true });
    this.setState({ machineSelected: machine, loading: false });
  };

}

export default withConnect(Machines);
