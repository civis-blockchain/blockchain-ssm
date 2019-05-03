import React from "react";
import { Drawer } from "@material-ui/core";
import { Machine } from "../../../domain/machine";
import { MachineCard } from "../../../components/Machine/MachineCard";
import styled, { css } from "styled-components";
import {backgroundColor, textColor, themeSsm} from "../../theme";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";

export const drawerWidth = "70%";

export const DrawerDetails = styled(Drawer).attrs(({ theme }) => ({
  classes: { paper: "paper" }
}))`
  width: ${drawerWidth};

  & .paper {
    width: ${drawerWidth};
  }
`;

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        background: "white"
      }
    }
  }
});

interface Props {
  machine: Machine | null;
  loading: boolean;
  onClose: () => void;
}

const MachineDetails = ({ loading, onClose, machine }: Props) => (
    <MuiThemeProvider theme={theme}>
      <DrawerDetails anchor="right" open={machine !== null || loading} onClose={onClose}>
        {(loading || !machine) && "Loading"}
        {machine && <MachineCard machine={machine} />}
      </DrawerDetails>
    </MuiThemeProvider>
);


export default MachineDetails;
