import { goToAutomatonSession, goToHome, goToMachines } from "store/actions/navigation";
import { connect } from "react-redux";

const mapDispatchToProps = {
  goToHome,
  goToMachines,
  goToAutomatonSession
};

export default connect(
  null,
  mapDispatchToProps
);
