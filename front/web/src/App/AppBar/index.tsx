import React from "react";
import styled from "styled-components";
import MuiAppBar from "@material-ui/core/AppBar";
import { drawerWidth } from "../Drawer";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "./Toolbar";
import IconButton from "@material-ui/core/IconButton";
import H1 from "../../components/H1";

export const Wrapper = styled(MuiAppBar).attrs(() => ({
  position: "fixed"
}))`
  z-index: ${({ theme }: any) => {
    console.log("theme", theme);
    return "3";
  }};
  /*transition: $ {({ theme }) => }theme.transitions.create(["width", "margin"], {*/
  /*easing: theme.transitions.easing.sharp,*/
  /*duration: theme.transitions.duration.leavingScreen / duration: theme.transitions.duration.enteringScreen*/
  margin-left: ${drawerWidth}px;
  width: calc(100% - ${drawerWidth}px);
`;

const MenuButton = styled(IconButton)`
  margin-right: 20px;
`;

interface Props {
  title: string;
  drawerOpen: boolean;
  onDrawerOpen: () => void;
}
export const AppBar = ({ drawerOpen, onDrawerOpen, title }: Props) => (
  <Wrapper>
    <Toolbar disableGutters={!drawerOpen}>
      {drawerOpen && (
        <MenuButton
          color="inherit"
          aria-label="Open drawer"
          onClick={onDrawerOpen}
        >
          <MenuIcon />
        </MenuButton>
      )}
      <H1>{title}</H1>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </Wrapper>
);

export default AppBar;
