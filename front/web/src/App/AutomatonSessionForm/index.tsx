import React from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const AutomatonSessionForm = () => (
  <form>
    <TextField label="Middleware URI" />
    <TextField label="Session ID" />
    <TextField label="Private Key" />
    <TextField label="Public Key" />
    <Button>Go</Button>
  </form>
);

export default AutomatonSessionForm;
