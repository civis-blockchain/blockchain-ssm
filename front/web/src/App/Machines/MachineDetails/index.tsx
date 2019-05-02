import React from "react";
import { Drawer } from "@material-ui/core";
import { Machine } from "../../../domain/machine";
import { MachineCard } from "../../../components/Machine/MachineCard";
import styled, { css } from "styled-components";

export const drawerWidth = "70%";

export const DrawerDetails = styled(Drawer).attrs(({ theme }) => ({
  classes: { paper: "paper" }
}))`
  width: ${drawerWidth};

  & .paper {
    width: ${drawerWidth};
  }
`;

interface Props {
  machine: Machine | null;
  loading: boolean;
  onClose: () => void;
}

const MachineDetails = ({ loading, onClose, machine }: Props) => (
  <DrawerDetails anchor="right" open={machine !== null || loading} onClose={onClose}>
    {(loading || !machine) && "Loading"}
    {machine && <MachineCard machine={machine} />}
  </DrawerDetails>
);


export default MachineDetails;
