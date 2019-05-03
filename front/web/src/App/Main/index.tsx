import React, { ReactNode } from "react";
import styled from "styled-components";
import withTheme from "@material-ui/core/styles/withTheme";
import {backgroundColorTertiary} from "../theme";

const Wrapper = withTheme()(styled.main`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.unit * 3}px;
  height: 100vh;
  overflow: auto;
  background-color: ${backgroundColorTertiary};
`);

const ToolbarSpacer = withTheme()(styled.div`
  ${({ theme }) => theme.mixins.toolbar}
`);

interface Props {
  children: ReactNode;
}
export const Main = ({ children }: Props) => (
  <Wrapper>
    <ToolbarSpacer />
    {children}
  </Wrapper>
);

export default Main;
