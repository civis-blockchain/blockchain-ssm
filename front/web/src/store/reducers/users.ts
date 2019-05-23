import { Action } from "redux";

export const usersReducer = (state: string[] = [], action: Action): string[] => {
  if(action.type === "USER_LIST") {
    // @ts-ignore
    return action.payload.list;
  }
  if(action.type === "USER_ADD") {
    // @ts-ignore
    state.push(action.payload.obj);
    return state;
  }
  return state;
};
