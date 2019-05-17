import React from "react";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import createStyles from "@material-ui/core/es/styles/createStyles";
import { Theme } from "@material-ui/core/es";
import {Session, SessionLog} from "../../../domain/session";
import {MachineGraph} from "../../Machine/MachineGraph";
import {Machine} from "../../../domain/machine";
import {SessionLogs} from "../SessionLogs";

const styles = ({ spacing, mixins }: Theme) => createStyles({
  root: {
    padding: "10px",
  },
});

interface Props {
  session: Session;
  logs: SessionLog[] | null;
  machine: Machine;
  onMachineClick: (machine: Machine) => void;
  classes: {
    root: string;
  };
}

export const SessionCard = withStyles(styles) (({session, logs, machine, classes, onMachineClick}: Props) => (
  <div>
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">{session.session}</Typography>
      <Typography variant="h6" component="h4" onClick={() => {onMachineClick(machine)}}>{session.ssm}</Typography>
      <MachineGraph machine={machine}/>
      {logs !== null && <SessionLogs logs={logs}/>}
    </Paper>
  </div>
));

