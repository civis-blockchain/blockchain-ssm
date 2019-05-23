import React from "react";
import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme, {Theme} from "@material-ui/core/es/styles/createMuiTheme";
import {SessionCard} from "../../../components/Session/SessionCard";
import {detailsWidth} from "../../theme";
import {Session, SessionLog} from "../../../domain/session";
import {Machine} from "../../../domain/machine";
import {fetchSessionLogs} from "../../../ssm/ssm-requester";
import withConnect from "./withConnect";

export const DrawerDetails = styled(Drawer).attrs(({ theme }) => ({
  classes: { paper: "paper" }
}))`
  width: ${detailsWidth};

  & .paper {
    width: ${detailsWidth};
  }
`;

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        background: "white",
          width: detailsWidth

      }
    }
  }
});

interface Props {
  theme: Theme | ((outer: Theme | null) => Theme);
  session: Session;
  machine: Machine;
  goTo: () => {};
  goToMachine: (machine: Machine) => {};
}

interface State {
  logs: SessionLog[] | null
}

class SessionDetails extends React.Component<Props, State> {
  state = {logs: null};

  componentDidMount() {
    const {session, machine} = this.props;
    fetchSessionLogs(session.session).then( logs => this.setState({logs: logs}))
  }

  render() {
    const {session, machine, goToMachine} = this.props;

    return <MuiThemeProvider theme={theme}>
      <DrawerDetails anchor="right" open={session !== null } onClose={this.props.goTo}>
        {session && <SessionCard session={session} logs={this.state.logs} machine={machine} onMachineClick={() => goToMachine(machine)}/>}
      </DrawerDetails>
    </MuiThemeProvider>
  }
}

export default withConnect(SessionDetails);
