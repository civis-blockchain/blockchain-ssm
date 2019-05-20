import { Action } from "redux";

export const usersReducer = (state: string[] = [], action: Action): string[] => {
  if(action.type === "USER_LIST") {
    // @ts-ignore
    return action.payload.list;
  }
  return state;
};
