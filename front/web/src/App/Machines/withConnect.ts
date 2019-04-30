import {connect} from "react-redux"
import { State } from "../../store";

const mapStateToProps = (state: State) => ({list: state.machines});

export default connect(mapStateToProps);
