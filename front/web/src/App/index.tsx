import React from "react";
import UIContainer from "./UIContainer";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import Main from "./Main";
import withConnect from "./withConnect";
import { Page } from "store/actions/navigation";
import Home from "./Home";
import AutomatonSessionForm from "./AutomatonSessionForm";

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

  render() {
    return (
      <UIContainer>
        <AppBar
          drawerOpen={this.state.open}
          onDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer open={this.state.open} onClose={this.handleDrawerClose} />
        <Main>
          {this.props.page === "HOME_PAGE" && <Home />}
          {this.props.page === "AUTOMATON_SESSION_PAGE" && (
            <AutomatonSessionForm />
          )}
        </Main>
      </UIContainer>
    );
  }
}

export default withConnect(App);
