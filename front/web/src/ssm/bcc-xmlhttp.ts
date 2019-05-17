/*
 * example XMLHttpRequest client for the bcc-rest server
 */

export const bccHostCmd = function (uri: string, cmd: string, fcn: string, args: string, onOk: (value: string) => void, onError:  (value: string) => void) {

	const cbctx = {
		onOk: onOk,
		onError: onError
	};

	const xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState !== 4) {
			return;
		}
		if (this.status !== 200) {
			if (cbctx.onError) {
				cbctx.onError(this.responseText);
			}
		}
		else {
			if (cbctx.onOk) {
				cbctx.onOk(this.responseText);
			}
		}
	};

	if(cmd === 'invoke') {
		const json = {
			cmd: cmd,
			fcn: fcn,
			args: args
		};
		xmlhttp.open("POST", uri, true);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify(json));
	} else {
		let query = "cmd=" + encodeURIComponent(cmd) + "&fcn=" + encodeURIComponent(fcn);
		// @ts-ignore
		args.map(function(arg: string) {query += "&args=" + encodeURIComponent(arg);});
		xmlhttp.open("GET", uri + "?" + query, true);
		xmlhttp.send();
	}
	return cbctx;
};
