import React from "react";
import UIContainer from "./UIContainer";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import Main from "./Main";
import withConnect from "./withConnect";
import { Page } from "store/actions/navigation";
import Home from "./Home";
import AutomatonSessionForm from "./AutomatonSessionForm";
import Machines from "./Machines";

interface Props {
  page: Page;
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
          {this.props.page === "MACHINES_PAGE" && (
            <Machines />
          )}
        </Main>
      </UIContainer>
    );
  }
}

export default withConnect(App);
