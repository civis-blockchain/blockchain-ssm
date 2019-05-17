import React from "react";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import { Table } from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {SessionLog} from "../../../domain/session";

const SessionCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

interface Props {
  logs: SessionLog[];
}

export const SessionLogs = ({logs}: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <SessionCell>Previous</SessionCell>
        <SessionCell>Current</SessionCell>
        <SessionCell>Iteration</SessionCell>
        <SessionCell>Public</SessionCell>
        <SessionCell>Transaction</SessionCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {logs.map(log => (
        <TableRow key={log.txId}>
          <SessionCell component="th" scope="row">
            { log.state.origin !== undefined ? log.state.origin.from : '' }
          </SessionCell>
          <SessionCell component="th" scope="row">
            {log.state.current}
          </SessionCell>
          <SessionCell>
            {log.state.iteration}
          </SessionCell>
          <SessionCell>
            {log.state.public}
          </SessionCell>
          <SessionCell>
            {log.txId}
          </SessionCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
