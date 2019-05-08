import React from "react";
import UIContainer from "./UIContainer";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import Main from "./Main";
import withConnect from "./withConnect";
import {Page} from "store/actions/navigation";
import Home from "./Home";
import AutomatonSessionForm from "./AutomatonSessionForm";
import Machines from "./Machines";
import {themeSsm} from "./theme";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import ObjectDetails from "./Details/MachineDetails";
import {Machine} from "../domain/machine";

interface Props {
  page: Page;
  machine: Machine | null;
  goToMachines: () => {};
}

interface State {
  open: boolean;
}

export class App extends React.PureComponent<Props, State> {
  state = {
    open: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  getTitle = (): string => {
    if (this.props.page  === "HOME_PAGE") {
      return "Home";
    }
      if (this.props.page  === "AUTOMATON_SESSION_PAGE") {
          return "Session";
      }
      if (this.props.page  === "MACHINES_PAGE") {
          return "Machine";
      }
      return "SSM";
  };

  render() {
    return (
      <UIContainer>
        <MuiThemeProvider theme={themeSsm}>
        <AppBar
          drawerOpen={this.state.open}
          onDrawerOpen={this.handleDrawerOpen}
          title={this.getTitle()}
        />
        <Drawer open={this.state.open} onClose={this.handleDrawerClose} />
        <Main>
          {this.props.page === "HOME_PAGE" && <Home />}
          {this.props.page === "AUTOMATON_SESSION_PAGE" && (
            <AutomatonSessionForm />
          )}
          {(this.props.page === "MACHINES_PAGE" || this.props.page === "MACHINE_PAGE") && (
            <Machines />
          )}
        </Main>
            {(this.props.machine !== null && this.props.machine !== undefined)
                    && <ObjectDetails machine={this.props.machine} goTo={this.props.goToMachines}/>
        }

        </MuiThemeProvider>
      </UIContainer>
    );
  }
}

export default withConnect(App);
