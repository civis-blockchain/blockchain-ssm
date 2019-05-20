import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Store
} from "redux";
import { connectRoutes } from "redux-first-router";
import routes from "./routes";
import {machinesReducer} from "./reducers/machines";
import {Page} from "./actions/navigation";
import { Machine } from "../domain/machine";
import {fetchMachines, fetchSessions, fetchUsers} from "./fetchers/coop";
import {Session} from "../domain/session";
import {sessionsReducer} from "./reducers/sessions";
import {User} from "../domain/user";
import {usersReducer} from "./reducers/users";

type LocationState = {
  pathname: string;
  type: Page;
  payload: {
    machineId?: string,
    automatonId?: string;
    sessionId?: string;
  };
};

export type State = {
  users: User[];
  machines: Machine[];
  sessions: Session[];
  location: LocationState;
};

const defaultInitialState: State = {
  location: {
    pathname: "/",
    type: "HOME_PAGE",
    payload: {},
  },
  users: [],
  machines: [],
  sessions: []
};

const reduxFirstRouter = connectRoutes(routes);

const reducer = combineReducers({
  location: reduxFirstRouter.reducer,
  machines: machinesReducer,
  sessions: sessionsReducer,
  users: usersReducer
});
const middlewares = [reduxFirstRouter.middleware];

export const createAppStore = (
  initialState: State = defaultInitialState
): Store =>
  createStore(
    reducer,
    initialState,
    compose(
      reduxFirstRouter.enhancer,
      applyMiddleware(...middlewares),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        : (f: any): any => f
    )
  );

export const store = createAppStore();

fetchMachines().then(machines => {
  store.dispatch({type: "MACHINE_LIST", payload: {list:machines}})
});

fetchSessions().then(sessions => {
  store.dispatch({type: "SESSION_LIST", payload: {list:sessions}})
});

fetchUsers().then(users => {
  store.dispatch({type: "USER_LIST", payload: {list:users}})
});

export default store;
