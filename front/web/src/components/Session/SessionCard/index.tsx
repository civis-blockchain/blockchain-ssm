import React from "react";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import createStyles from "@material-ui/core/es/styles/createStyles";
import { Theme } from "@material-ui/core/es";
import {Session} from "../../../domain/session";

const styles = ({ spacing, mixins }: Theme) => createStyles({
  root: {
    padding: "10px",
  },
});

interface Props {
  session: Session;
  classes: {
    root: string;
  };
}

export const SessionCard = withStyles(styles) (({session, classes}: Props) => (
  <div>
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">{session.session}</Typography>
      <Typography variant="h6" component="h4">{session.ssm}</Typography>
    </Paper>
  </div>
));

