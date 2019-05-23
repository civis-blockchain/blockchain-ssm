import {connect} from "react-redux"
import { State } from "../../store";
import {goToUserAdd} from "../../store/actions/navigation";

const mapStateToProps = (state: State) => ({list: state.users});

const mapDispatchToProps = {
    goToUserAdd
};

export default connect(mapStateToProps, mapDispatchToProps);
