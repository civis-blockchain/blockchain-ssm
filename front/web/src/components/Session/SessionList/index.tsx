import React from "react";
import { Session } from "../../../domain/session";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import { Table } from "@material-ui/core";

interface Props {
  sessions: Session[];
  onClick: () => void;
}

export const SessionList = ({sessions, onClick}: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {sessions.map(session => (
        <TableRow key={session.session} onClick={onClick}>
          <TableCell component="th" scope="row">
            {session.session}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
