import React from "react";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import {Theme} from "@material-ui/core/es/styles/createMuiTheme";
import {DrawerDetails} from "../../Details";
import Paper from "@material-ui/core/es/Paper";
import TextField from "@material-ui/core/es/TextField";
import withStyles from "@material-ui/core/es/styles/withStyles";
import createStyles from "@material-ui/core/es/styles/createStyles";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/es/Grid";
import Typography from "@material-ui/core/es/Typography";
import {User} from "../../../domain/user";
import withConnect from "./withConnect";

interface Props {
  theme: Theme | ((outer: Theme | null) => Theme);
  goTo: () => {};
  onCreateUser: (user: User) => void;
  classes: {
    textField: string;
    button: string;
  };

}

interface State {
    pub: string
    name: string
    open: boolean
}

const stylesForm = ({ palette, spacing }: Theme) => createStyles({
    textField: {
        marginLeft: spacing.unit,
        marginRight: spacing.unit,
        width: 350
    },
    button: {
        margin: spacing.unit,
    },
});

class UserAddDetails extends React.Component<Props, State> {
    state = {
        pub: "",
        name: "",
        open: true
    };

    handleChange = (name: string ) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { goTo, theme, classes, onCreateUser} = this.props;
        const { open, pub, name} = this.state;
        return <MuiThemeProvider theme={theme}>
            <Paper>
                <DrawerDetails anchor="right" open={open} onClose={goTo}>
                    <Typography variant="h3" gutterBottom>
                        Create User
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="name-required"
                                label="Name"
                                margin="normal"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                multiline
                                id="pub-multiline-flexible"
                                label="Public key"
                                rows={15}
                                value={this.state.pub}
                                onChange={this.handleChange('pub')}
                                margin="normal"
                                variant="outlined"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={() => onCreateUser({pub: pub, name: name})}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </DrawerDetails>
            </Paper>
        </MuiThemeProvider>
    }
}

export default withStyles(stylesForm)(withConnect(UserAddDetails));
