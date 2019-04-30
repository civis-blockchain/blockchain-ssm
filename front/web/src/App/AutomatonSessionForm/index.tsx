import React from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { SessionStateCard } from "../../components/SessionStateCard";

export const AutomatonSessionForm = () => (
  <form>
    <TextField label="Middleware URI" />
    <TextField label="Session ID" />
    <TextField label="Private Key" />
    <TextField label="Public Key" />
    <Button>Go</Button>
    <Divider />
    <SessionStateCard />
  </form>
);

export default AutomatonSessionForm;
