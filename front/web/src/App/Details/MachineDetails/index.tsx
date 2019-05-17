import React from "react";
import { Drawer } from "@material-ui/core";
import styled, { css } from "styled-components";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import {Theme} from "@material-ui/core/es/styles/createMuiTheme";
import {Machine} from "../../../domain/machine";
import {MachineCard} from "../../../components/Machine/MachineCard";
import {detailsWidth} from "../../theme";
import withConnect from "./withConnect";

export const DrawerDetails = styled(Drawer).attrs(({ theme }) => ({
  classes: { paper: "paper" }
}))`
  width: ${detailsWidth};

  & .paper {
    width: ${detailsWidth};
  }
`;

interface Props {
  theme: Theme | ((outer: Theme | null) => Theme);
  machine: Machine | null;
  goTo: () => {};
  goToSession: (machineId: string, sessionId: string) => {};
}

const MachineDetails = ({ machine, goTo, theme, goToSession}: Props) => (
    <MuiThemeProvider theme={theme}>
        <DrawerDetails anchor="right" open={machine !== null} onClose={goTo}>
            {machine && <MachineCard onSessionClick={goToSession} machine={machine} />}
        </DrawerDetails>
    </MuiThemeProvider>
);

export default withConnect(MachineDetails);
