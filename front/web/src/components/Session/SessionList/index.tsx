import React from "react";
import { Session } from "../../../domain/session";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import { Table } from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";

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
  sessions: Session[];
}

export const SessionList = ({sessions}: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <SessionCell>Name</SessionCell>
        <SessionCell>Current</SessionCell>
        <SessionCell>Iteration</SessionCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {sessions.map(session => (
        <TableRow key={session.session} >
          <SessionCell component="th" scope="row">
            {session.session}
          </SessionCell>
          <SessionCell>
            {session.current}
          </SessionCell>
          <SessionCell>
            {session.iteration}
          </SessionCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
