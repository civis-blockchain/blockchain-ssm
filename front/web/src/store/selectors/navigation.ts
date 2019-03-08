import { createSelector } from "reselect";
import { State } from "../";

const getLocation = (state: State) => state.location;

export const getPage = createSelector(
  getLocation,
  location => location.type
);
