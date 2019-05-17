import { getPage } from "../store/selectors/navigation";
import { connect } from "react-redux";
import { State } from "../store";
import {Machine} from "../domain/machine";
import {goToMachines} from "../store/actions/navigation";
import {Session} from "../domain/session";

const mapStateToProps = (state: State) => ({
  page: getPage(state),
  machine: getMachine(state),
  session: getSession(state)
});

const getMachine = (state: State) : Machine | null => {
  const machineId = state.location.payload !== undefined && state.location.payload.machineId !== undefined
      ? state.location.payload.machineId : null;

  const machine = state.machines.find(element => element.name === machineId);
  return machine !== undefined ? machine : null;
};

const getSession = (state: State) : Session | null => {
  const sessionId = state.location.payload !== undefined && state.location.payload.sessionId !== undefined
      ? state.location.payload.sessionId : null;

  const session = state.sessions.find(element => element.session === sessionId);
  return session !== undefined ? session : null;
};

const mapDispatchToProps = {
  goToMachines
};

export default connect(mapStateToProps, mapDispatchToProps);
