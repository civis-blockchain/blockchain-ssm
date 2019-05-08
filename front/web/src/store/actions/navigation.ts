import {Machine} from "../../domain/machine";

export type Page = "HOME_PAGE" | "AUTOMATON_SESSION_PAGE" | "MACHINES_PAGE" | "MACHINE_PAGE" ;

interface NavigationAction {
  type: Page;
  payload?: {
    machineId?: string,
    automatonId?: string;
    sessionId?: string;
  };
}

export const goToHome = (): NavigationAction => ({
  type: "HOME_PAGE"
});

export const goToMachines = (): NavigationAction => ({
  type: "MACHINES_PAGE"
});

export const goToMachine = (machine: Machine): NavigationAction => ({
  type: "MACHINE_PAGE",
  payload: {
    machineId: machine.name,
  }
});

export const goToAutomatonSession = (
  automatonId: string,
  sessionId: string
): NavigationAction => ({
  type: "AUTOMATON_SESSION_PAGE",
  payload: {
    automatonId,
    sessionId
  }
});
