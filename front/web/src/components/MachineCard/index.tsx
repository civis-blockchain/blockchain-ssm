import React from "react";
import { CardHeader } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/es/Card";
import Avatar from "@material-ui/core/es/Avatar";
import { Machine } from "../../domain/machine";
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
