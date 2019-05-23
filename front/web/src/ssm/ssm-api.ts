import {User} from "../domain/user";

const CryptoJS = require("crypto-js");
const {JSEncrypt} = require("jsencrypt");

export const ssmRegister = (user: User, admin: string, adminKey: string) => {
	const JSE = new JSEncrypt({default_key_size: 2048});
	JSE.setPrivateKey(adminKey);
	user.pub = flattenPublicKey(user.pub);
	const userStr = JSON.stringify(user);
	const signStr = JSE.sign(userStr, CryptoJS.SHA256, "sha256");
	const hostCmd = {
		cmd: "invoke",
		fcn: "register",
		args: [userStr, admin, signStr]
	};

	return hostCmd;
};

export const ssmCreate = (ssm: string, admin: string, adminKey: string ) => {
	const JSE = new JSEncrypt({default_key_size: 2048});
	JSE.setPrivateKey(adminKey);
	const ssmStr = JSON.stringify(ssm);
	const signStr = JSE.sign(ssmStr, CryptoJS.SHA256, "sha256");
	const hostCmd = {
		cmd: "invoke",
		fcn: "create",
		args: [ssmStr, admin, signStr]
	};

	return hostCmd;
};

export const ssmStart = (session: string, admin: string, adminKey: string) => {
	const JSE = new JSEncrypt({default_key_size: 2048});
	JSE.setPrivateKey(adminKey);
	const sessionStr = JSON.stringify(session);
	const signStr = JSE.sign(sessionStr, CryptoJS.SHA256, "sha256");
	const hostCmd = {
		cmd: "invoke",
		fcn: "start",
		args: [sessionStr, admin, signStr]
	};

	return hostCmd;
};

export const ssmPerform = (action: string, context: string, user: string, userPrivateKey: string) => {
	const JSE = new JSEncrypt({default_key_size: 2048});
	JSE.setPrivateKey(userPrivateKey);
	const contextStr = JSON.stringify(context);
	const signStr = JSE.sign(action + contextStr, CryptoJS.SHA256, "sha256");
	const hostCmd = {
		cmd: "invoke",
		fcn: "perform",
		args: [action, contextStr, user, signStr]
	};

	return hostCmd;
};

export const ssmQuery = (fcn: string, id: string) => {
	const hostCmd = {
		cmd: "query",
		fcn: fcn,
		args: [id]
	};

	return hostCmd;
};

export const flattenPublicKey = (pub: string) => {
	const pubLst = pub.split("\n");
	let res = "";
	pubLst.map(function(str: string) {
		if (str !== "" && str.indexOf("PUBLIC KEY") === -1) {
			res += str;
		}
	});
	return res;
};

