import React from "react";
import { Drawer } from "@material-ui/core";
import styled, { css } from "styled-components";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import {Machine} from "../../../domain/machine";
import {MachineCard} from "../../../components/Machine/MachineCard";
import {detailsWidth} from "../../theme";

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
  machine: Machine | null;
  goTo: () => {};
}

const MachineDetails = ({ machine, goTo }: Props) => (
    <MuiThemeProvider theme={theme}>
        <DrawerDetails anchor="right" open={machine !== null} onClose={goTo}>
            {machine && <MachineCard machine={machine} />}
        </DrawerDetails>
    </MuiThemeProvider>
);

export default MachineDetails;
