import {ssmCreate, ssmPerform, ssmRegister, ssmStart} from "./ssm-api";
import {bccHostCmd} from "./bcc-xmlhttp";
import {PublicUser} from "../domain/user";

function hostCmdSetup({uri, cmd, fcn, args, onOk, onError}: { uri: any, cmd: any, fcn: any, args: any, onOk: any, onError: any }) {
	const cbctx = bccHostCmd(uri, cmd, fcn, args, onOk, onError);
	return cbctx;
}

function ssmRegisterSetup(onOk: ()=> void, onError: ()=> void) {
	const uri = "";
	const user: PublicUser = {
		name: "",
		pub: ""
	}
	const admin = "";
	const adminKey = "";
	const hostCmd = ssmRegister(user, admin, adminKey);
	const cbctx = hostCmdSetup({
		uri: uri,
		cmd: hostCmd.cmd,
		fcn: hostCmd.fcn,
		args: hostCmd.args,
		onOk: onOk,
		onError: onError
	});
	return cbctx;
}

function ssmCreateSetup(onOk: ()=> void, onError: ()=> void) {
	const uri = "";
	const ssm = "";
	const admin = "";
	const adminKey = "";
	const hostCmd = ssmCreate(ssm, admin, adminKey);
	const cbctx = hostCmdSetup({
		uri: uri,
		cmd: hostCmd.cmd,
		fcn: hostCmd.fcn,
		args: hostCmd.args,
		onOk: onOk,
		onError: onError
	});
	return cbctx;
}

function ssmStartSetup(onOk: ()=> void, onError: ()=> void) {
	const uri = "";
	const session = "";
	const admin = "";
	const adminKey = "";
	const hostCmd = ssmStart(session, admin, adminKey);
	const cbctx = hostCmdSetup({
		uri: uri,
		cmd: hostCmd.cmd,
		fcn: hostCmd.fcn,
		args: hostCmd.args,
		onOk: onOk,
		onError: onError
	});
	return cbctx;
}

function ssmPerformSetup(onOk: ()=> void, onError: ()=> void) {
	const uri = "";
	const context = "";
	const action = "";
	const user = "";
	const userKey = "";
	const hostCmd = ssmPerform(action, context, user, userKey);
	const cbctx = hostCmdSetup({
		uri: uri,
		cmd: hostCmd.cmd,
		fcn: hostCmd.fcn,
		args: hostCmd.args,
		onOk: onOk,
		onError: onError
	});
	return cbctx;
}
