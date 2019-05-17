import {connect} from "react-redux"
import {goToMachine} from "../../../store/actions/navigation";

const mapDispatchToProps = {
    goToMachine
};

export default connect(null, mapDispatchToProps);
