import { Action } from "redux";

export const sessionsReducer = (state: string[] = [], action: Action): string[] => {
  if(action.type === "SESSION_LIST") {
    // @ts-ignore
    return action.payload.list;
  }
  return state;
};
