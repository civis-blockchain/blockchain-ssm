import React from "react";
import styled, { css } from "styled-components";
import MuiDrawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import { withTheme } from "@material-ui/core/styles";
import withConnect from "./withConnect";

// @ts-ignore
import Logo from "../../../public/logo-ssm-light.png";
import {drawerWidth} from "../theme";

// TODO set variant to 'temporary' on mobile
// TODO force OPEN to true on desktop only
// TODO set anchor on mobile only

interface WrapperProps {
  open: true | undefined;
}
const Wrapper = styled(MuiDrawer).attrs(({ theme }) => ({
  variant: "permanent",
  open: true,
  anchor: theme.direction === "rtl" ? "right" : "left",
  classes: { paper: "paper" }
}))<WrapperProps>`
  position: relative;
  white-space: nowrap;
  width: ${drawerWidth}px;

  & .paper {
    width: ${drawerWidth}px;
  }

  ${props =>
    props.open
      ? undefined
      : css`
          overflow-x: hidden;
        `}
`;

// TODO style only on desktop size
const Nav = styled.nav`
  width: ${drawerWidth};
  flex-shrink: 0;
`;

const DrawerSpacer = withTheme()(styled.div`
  ${({ theme }) => theme.mixins.toolbar}
  display: flex;
  justify-content: center;
  & img {
     width: 150px;
     height: 55px;
     margin-top: 5px;
  }
`);

interface Props {
  open: boolean;
  onClose: () => void;
  goToHome: () => void;
  goToMachines: () => void;
  goToAutomatonSession: (automatonId: string, sessionId: string) => void;
}

const Drawer = ({
  open,
  goToHome,
  goToAutomatonSession,
  goToMachines
}: Props) => (
  <Nav>
    <Wrapper open={open || undefined}>
      <div>
        <DrawerSpacer><img src={Logo} alt="Logo" /></DrawerSpacer>
        <List>
          <ListItem button onClick={goToHome}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button onClick={goToMachines}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Machines" />
          </ListItem>
          <ListItem button onClick={() => goToAutomatonSession("a", "s")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Query session form" />
          </ListItem>
        </List>
      </div>
    </Wrapper>
  </Nav>
);

export default withConnect(Drawer);
