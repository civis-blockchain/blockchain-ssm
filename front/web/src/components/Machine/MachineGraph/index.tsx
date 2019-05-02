import React, { Component } from "react";
// @ts-ignore
import { Network, Node, Edge } from "@lifeomic/react-vis-network";
import { Machine } from "../../../domain/machine";
import styled from "styled-components";

interface Props {
  machine: Machine;
}

const options = {
  "physics": {
    "enabled": true,
    "solver": "repulsion",
    "repulsion": {
      "damping": 0.9,
      "springConstant": 0.1,
      "springLength": 300,
      "nodeDistance": 100
    }
  },
  "manipulation": {
    "enabled": false
  }
};

const Section = styled.section`
 height: 350px;
`;


export const MachineGraph = ({ machine }: Props) => {
  let nodes: Node[] = [];
  let edges: Node[] = [];
  let nbNodes = 0;
  let j = 0;
  machine.transitions.map(trans => {
    j++;
    nbNodes = Math.max(nbNodes, Math.max(trans.to + 1, trans.from + 1));
    edges.push(<Edge key={j} id={j} from={trans.from} to={trans.to} label={trans.role + ": " + trans.action} arrows="to"/>);
  });

  for (let i = 0; i < nbNodes; i++) {
    nodes.push(<Node key={i} id={i} label={i.toString()}/>);
  }
  return <Section><Network key={machine.name} options={options}>{nodes}{edges}</Network></Section>;
};
