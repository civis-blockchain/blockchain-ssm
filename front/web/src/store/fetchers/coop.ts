import { Machine } from "../../domain/machine";
import {Session, SessionLog} from "../../domain/session";

export const fetchMachines = async () : Promise<Machine[]> => {
  const sessions = await fetchSessions();
  const json :string[] = await fetchCoop("query", "list", "ssm");
  const machines =  json.map( name => fetchMachine(name, sessions));
  return Promise.all(machines);
};

export  const fetchMachine = async (machineName: string, sessions: Session[]) : Promise<Machine> => {
  const machine :Machine = await fetchCoop( "query", "ssm", machineName);
  machine.sessions = sessions.filter(session => ifFromMachine(session, machine));
  return machine;
};

export  const ifFromMachine = (session: Session, machine: Machine) =>  {
  return (session.ssm === machine.name);
};

export  const fetchSessions = async () : Promise<Session[]> => {
  const json :string[] = await fetchCoop("query", "list", "session");
  return Promise.all(json.map(fetchSession))
};

export  const fetchSession = async (session: string) : Promise<Session> => {
  return fetchCoop("query", "session", session);
};

export  const fetchSessionLogs = async (session: string) : Promise<SessionLog[]> => {
  return fetchCoop("query", "log", session);
};

export  const fetchCoop = async ( cmd: String, fcn: String, args: String) : Promise<any> => {
  const response = await fetch(`${process.env.COOP_URL}?args=${args}&cmd=${cmd}&fcn=${fcn}`);
  return response.json();
};
