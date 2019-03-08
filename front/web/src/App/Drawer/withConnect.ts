import { goToAutomatonSession, goToHome } from "store/actions/navigation";
import { connect } from "react-redux";

const mapDispatchToProps = {
  goToHome,
  goToAutomatonSession
};

export default connect(
  null,
  mapDispatchToProps
);
