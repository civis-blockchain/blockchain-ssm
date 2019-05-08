import {connect} from "react-redux"
import { State } from "../../store";
import {goToMachine} from "../../store/actions/navigation";

const mapStateToProps = (state: State) => ({list: state.machines});

const mapDispatchToProps = {
    goToMachine
};


export default connect(mapStateToProps, mapDispatchToProps);
