import React from "react";
import withConnect from "./withConnect";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import Paper from "@material-ui/core/es/Paper";

interface Props {
  list: string[]
}

const Machines = (props: Props) => (
  <Paper >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.list.map(machine => (
          <TableRow key={machine}>
            <TableCell component="th" scope="row">
              {machine}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default withConnect(Machines);
