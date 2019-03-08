import { getPage } from "../store/selectors/navigation";
import { connect } from "react-redux";
import { State } from "../store";

const mapStateToProps = (state: State) => ({
  page: getPage(state)
});

export default connect(mapStateToProps);
