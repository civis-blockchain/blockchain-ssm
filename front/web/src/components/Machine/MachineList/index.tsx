import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Machine } from "../../../domain/machine";
import { MachineGraph } from "../MachineGraph";
import { SessionList } from "../../Session/SessionList";
import {Paper, Table} from "@material-ui/core";
import withStyles, { StyleRules, WithStyles } from "@material-ui/core/es/styles/withStyles";
import createStyles from "@material-ui/core/es/styles/createStyles";
import { Theme } from "@material-ui/core/es";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";

interface Props {
  list: Machine[],
  onMachineClick: (machine: Machine) => void,
}

export const MachineList = ({list, onMachineClick}: Props) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Nb Session</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map(machine => (
            <TableRow key={machine.name} onClick={() => {onMachineClick(machine)}}>
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
);
