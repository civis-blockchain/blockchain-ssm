import styled from "styled-components";
import {Drawer} from "@material-ui/core";
import {detailsWidth} from "../theme";

export const DrawerDetails = styled(Drawer).attrs(({ theme }) => ({
    classes: { paper: "paper" }
}))`
  width: ${detailsWidth};

  & .paper {
    width: ${detailsWidth};
  }
`;
