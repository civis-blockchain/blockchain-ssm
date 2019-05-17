import React from "react";
import { Drawer } from "@material-ui/core";
import styled, { css } from "styled-components";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme, {Theme} from "@material-ui/core/es/styles/createMuiTheme";
import {SessionCard} from "../../../components/Session/SessionCard";
import {detailsWidth} from "../../theme";
import {Session} from "../../../domain/session";

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
  session: Session | null;
  goTo: () => {};
}

const SessionDetails = ({ session, goTo }: Props) => (
    <MuiThemeProvider theme={theme}>
        <DrawerDetails anchor="right" open={session !== null} onClose={goTo}>
            {session && <SessionCard session={session} />}
        </DrawerDetails>
    </MuiThemeProvider>
);

export default SessionDetails;
