import {connect} from "react-redux"
import {onCreateUser} from "../../../store";

const mapDispatchToProps = {
    onCreateUser
};

export default connect(null, mapDispatchToProps);
