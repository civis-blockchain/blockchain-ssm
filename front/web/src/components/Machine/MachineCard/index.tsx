import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Machine } from "../../../domain/machine";
import { MachineGraph } from "../MachineGraph";

const Title = styled(Typography).attrs(() => ({
  color: "textSecondary",
  gutterBottom: true
}))`
  font-size: 14px;
`;

interface Props {
  machine: Machine;
}

export const MachineCard = ({machine}: Props) => (
  <div>
    <Title>{machine.name}</Title>
    <MachineGraph machine={machine}/>
  </div>
);
