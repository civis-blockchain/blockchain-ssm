import {connect} from "react-redux"
import {goToSession} from "../../../store/actions/navigation";

const mapDispatchToProps = {
    goToSession
};

export default connect(null, mapDispatchToProps);
