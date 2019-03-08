import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export default styled(Typography).attrs(() => ({
  component: "h1",
  variant: "h6",
  color: "inherit",
  noWrap: true
}))`
  flex-grow: 1;
`;
