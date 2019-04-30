export type Page = "HOME_PAGE" | "AUTOMATON_SESSION_PAGE" | "MACHINES_PAGE";

interface NavigationAction {
  type: Page;
  payload?: {
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
