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
import { fetchMachines } from "./fetchers/coop";

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
  machines: Machine[];
  location: LocationState;
};

const defaultInitialState: State = {
  location: {
    pathname: "/",
    type: "HOME_PAGE",
    payload: {},
  },
  machines: []
};

const reduxFirstRouter = connectRoutes(routes);

const reducer = combineReducers({
  location: reduxFirstRouter.reducer,
  machines: machinesReducer
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

export default store;
