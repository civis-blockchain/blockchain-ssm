import { Action } from "redux";

export const machinesReducer = (state: string[] = [], action: Action): string[] => {
  if(action.type === "MACHINE_LIST") {
    // @ts-ignore
    return action.payload.list;
  }
  return state;
};
