import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Machine } from "../../../domain/machine";
import { MachineGraph } from "../MachineGraph";
import { SessionList } from "../../Session/SessionList";
import { Paper } from "@material-ui/core";
import withStyles, { StyleRules, WithStyles } from "@material-ui/core/es/styles/withStyles";
import createStyles from "@material-ui/core/es/styles/createStyles";
import { Theme } from "@material-ui/core/es";

const styles = ({ spacing, mixins }: Theme) => createStyles({
  root: {
    padding: "10px",
  },
});

interface Props {
  machine: Machine;
  classes: {
    root: string;
  };
  onSessionClick: (machineId: string, sessionId: string) => {};
}

export const MachineCard = withStyles(styles) (({machine, classes, onSessionClick}: Props) => (
  <div>
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">{machine.name}</Typography>
      <MachineGraph machine={machine}/>

      <SessionList onSessionClick={onSessionClick} sessions={machine.sessions} />
    </Paper>
  </div>
));

