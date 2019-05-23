import React from "react";
import withConnect from "./withConnect";
import Paper from "@material-ui/core/es/Paper";
import {User} from "../../domain/user";
import UserList from "../../components/User/UserList";
import {Grid} from "@material-ui/core";
import Fab from "@material-ui/core/es/Fab";
import AddIcon from '@material-ui/icons/Add';

interface Props {
  list: User[],
  goToUserAdd: () => void;
}

interface State {
  userSelected: User | null
}

class Users extends React.Component<Props, State> {
  state = { userSelected: null };

  render() {
    return <Grid container spacing={24}>
      <Grid item xs={11} />
      <Grid item xs={1} >
        <Fab color="primary" aria-label="Add">
          <AddIcon onClick={this.props.goToUserAdd}/>
        </Fab>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <UserList list={this.props.list} />
        </Paper>
      </Grid>
    </Grid>;
  }
}

export default withConnect(Users);
