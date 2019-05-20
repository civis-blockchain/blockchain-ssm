import React from "react";
import withConnect from "./withConnect";
import Paper from "@material-ui/core/es/Paper";
import {User} from "../../domain/user";
import UserList from "../../components/User/UserList";

interface Props {
  list: User[],
}

interface State {
  userSelected: User | null
}

class Users extends React.Component<Props, State> {
  state = { userSelected: null };

  render() {
    return <React.Fragment>
      <Paper>
        <UserList list={this.props.list} />
      </Paper>
    </React.Fragment>;
  }
}

export default withConnect(Users);
