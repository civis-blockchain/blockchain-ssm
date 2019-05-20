import { goToAutomatonSession, goToHome, goToMachines, goToUsers } from "store/actions/navigation";
import { connect } from "react-redux";

const mapDispatchToProps = {
  goToHome,
  goToMachines,
  goToUsers,
  goToAutomatonSession
};

export default connect(
  null,
  mapDispatchToProps
);
