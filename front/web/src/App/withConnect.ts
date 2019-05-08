import { getPage } from "../store/selectors/navigation";
import { connect } from "react-redux";
import { State } from "../store";
import {Machine} from "../domain/machine";
import {goToMachines} from "../store/actions/navigation";

const mapStateToProps = (state: State) => ({
  page: getPage(state),
  machine: getMachine(state)
});

const getMachine = (state: State) : Machine | null => {
  const machineId = state.location.payload !== undefined && state.location.payload.machineId !== undefined
      ? state.location.payload.machineId : null;

  const machine = state.machines.find(element => element.name === machineId);
  return machine !== undefined ? machine : null;
};

const mapDispatchToProps = {
  goToMachines
};

export default connect(mapStateToProps, mapDispatchToProps);
