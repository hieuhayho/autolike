import {app, BrowserView, BrowserWindow, dialog, ipcMain, Menu, net, session, shell, screen} from "electron";
import * as fs from "fs";
import * as url from "url";
import * as request from "request";
const path = require('path');
const rp = require('request-promise');
let windowManageAccount: BrowserWindow;
let version = '1.0';
let productionMode = false;

app.on("ready", () => {
	if (!windowManageAccount) {
		windowManageAccount = createWindow(getUrl());
		windowManageAccount.setMaximizable(true);
		windowManageAccount.maximize();
		windowManageAccount['version'] = version;
		windowManageAccount['nameWindows'] = {name: 'mainWindows'};
		windowManageAccount.on("closed", () => {
			app.quit();
			windowManageAccount = null;
		});
	}
});

app.on("activate", () => {
});

function createWindow(urlLoad: string): BrowserWindow {
	try {
		// disable automatically detect setting
		app.commandLine.appendSwitch('auto-detect', 'false');
		app.commandLine.appendSwitch('no-proxy-server');
		app.commandLine.appendSwitch('ignore-certificate-errors');
	} catch (e) {
		console.log(e);
	}
	let win = new BrowserWindow({maximizable: true, webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
			webviewTag: true,
			nodeIntegrationInWorker: true,
		}
	});
	win.webContents.on('will-navigate', ev => { // khi bấm vào các thẻ <a href="#"></a> sẽ ko bị chuyển hướng sang trang trắng
		console.log('------------------------------------------------');
		ev.preventDefault()
	});
	win['version'] = version;
	win['productionMode'] = productionMode;
	win.setResizable(true);
	win.webContents.clearHistory();
	win.webContents.session.clearCache((aaa) => {
		console.log(aaa);
	});
	win.loadURL(urlLoad);
	try {
		const {setup: setupPushReceiver} = require('electron-push-receiver');
		setupPushReceiver(win.webContents);
	} catch (e) {
		console.log(e);
	}
	let template: any = [{
		label: "Application",
		submenu: [
			{label: "About Application", selector: "orderFrontStandardAboutPanel:"},
			{type: "separator"},
			{
				label: "Quit", accelerator: "Command+Q", click: function () {
					app.quit();
				}
			}
		]
	}, {
		label: "Edit",
		submenu: [
			{label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
			{label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
			{type: "separator"},
			{label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
			{label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
			{label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
			{label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
		]
	}, {
		label: "View",
		submenu: [
			{
				label: "Mở thư mục chứa data", accelerator: "CmdOrCtrl+Shift+D", click: function () {
					let userAppDataPath = app.getPath('userData');
					shell.openItem(userAppDataPath);
				}
			},
			{
				label: "DevTool", accelemrator: "CmdOrCtrl+Shift+I", click: function () {
					win.webContents.openDevTools();
				}
			},
			{
				label: "Reload", accelerator: "CmdOrCtrl+Shift+R", click: function () {
					win.loadURL(urlLoad);
				}
			}
		]
	}
	];
	win.setMenu(Menu.buildFromTemplate(template));
	return win;
}

ipcMain.on("getRequest", (event, arg) => {
	let proxy = '';
	if (arg.proxy) {
		proxy = 'http://' + arg.proxy;
	}
	let headers = arg.headers;
	let idRender = arg.keyRender;
	let urlRedirect = '';
	try {
		if (proxy === '') {
			const request = net.request({url: arg.url, redirect: 'manual'});
			Object.keys(headers).forEach(function (key) {
				request.setHeader(key, headers[key]);
			});
			request.on('error', (error) => {
				try {
					event.sender.send("getRequestResponseError" + idRender, error !== undefined ? error.message : '');
				} catch (e) {
					console.log(e);
				}
			});

			request.on('response', (response) => {
				let data = "";
				response.on('data', (chunk) => {
					data += chunk;
				});
				response.on('end', () => {
					try {
						response['data'] = data;
						response['redirectURL'] = urlRedirect;
						event.sender.send("getRequestResponseSuccess" + idRender, response);
					} catch (e) {
						console.log(e);
					}
				})
			});
			request.on('redirect', (statusCode, method, redirectURL, responseHeaders) => {
				urlRedirect = redirectURL;
				request.followRedirect();
			});
			request.end();
		} else {
			const request = rp({
				url: arg.url,
				proxy: proxy,
				simple: false,
				rejectUnauthorized: false,
				requestCert: true
			});
			Object.keys(headers).forEach(function (key) {
				request.setHeader(key, headers[key]);
			});
			request.on('error', (error) => {
				try {
					event.sender.send("getRequestResponseError" + idRender, error !== undefined ? error.message : '');
				} catch (e) {
					console.log(e);
				}
			});
			request.on('response', (response) => {
				let data = "";
				response.on('data', (chunk) => {
					data += chunk;
				});
				response.on('end', () => {
					try {
						try {
							urlRedirect = response.request.uri.href;
						} catch (e) {
							console.log(e);
						}
						response['data'] = data;
						response['redirectURL'] = urlRedirect;
						event.sender.send("getRequestResponseSuccess" + idRender, response);
					} catch (e) {
						console.log(e);
					}
				})
			});
			request.end();
		}
	} catch (e) {
		event.sender.send("getRequestResponseError" + idRender, e !== undefined ? e.message : '');
	}
});

ipcMain.on("postRequest", (event, arg) => {
	let proxy = '';
	if (arg.proxy) {
		proxy = 'http://' + arg.proxy;
	}
	let headers = arg.headers;
	let idRender = arg.keyRender;
	try {
		if (proxy === '') {
			const request = net.request({method: 'POST', url: arg.url});
			var postData = arg.params;
			Object.keys(headers).forEach(function (key) {
				request.setHeader(key, headers[key]);
			});
			request.on('error', (error) => {
				try {
					event.sender.send("postRequestResponseError" + idRender, error !== undefined ? error.message : '');
					console.log(error);
				} catch (e) {
					console.log(e);
				}
			});

			request.on('response', (response) => {
				let data = "";
				// console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
				response.on('data', (chunk) => {
					data += chunk;
					// console.log(`BODY: ${chunk}`)
				});
				response.on('end', () => {
					// console.log('No more data in response.');
					try {
						response['data'] = data;
						event.sender.send("postRequestResponseSuccess" + idRender, response);
					} catch (e) {
						console.log(e);
					}
				})
			});
			request.write(postData);
			request.end();
		} else {
			const request = rp({
				proxy: proxy,
				method: 'POST',
				url: arg.url,
				simple: false,
				rejectUnauthorized: false,
				requestCert: true
			});
			var postData = arg.params;
			Object.keys(headers).forEach(function (key) {
				request.setHeader(key, headers[key]);
			});
			request.on('error', (error) => {
				try {
					event.sender.send("postRequestResponseError" + idRender, error !== undefined ? error.message : '');
					console.log(error);
				} catch (e) {
					console.log(e);
				}
			});

			request.on('response', (response) => {
				let data = "";
				// console.log(`STATUS: ${response.statusCode}`)
				// console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
				response.on('data', (chunk) => {
					data += chunk;
					// console.log(`BODY: ${chunk}`)
				});
				response.on('end', () => {
					// console.log('No more data in response.');
					try {
						response['data'] = data;
						event.sender.send("postRequestResponseSuccess" + idRender, response);
					} catch (e) {
						console.log(e);
					}
				})
			});
			request.write(postData);
			request.end();
		}
	} catch (e) {
		event.sender.send("postRequestResponseError" + idRender, e !== undefined ? e.message : '');
	}
});

ipcMain.on("uploadFile", (event, arg) => {
	let proxy = '';
	if (arg.proxy) {
		proxy = 'http://' + arg.proxy;
	}
	let headers = arg.headers;
	let idRender = arg.keyRender;
	let url = arg.url;
	let files = arg.files;

	let formData = {};
	for (let file of files) {
		formData[file.name] = fs.createReadStream(file.path);
	}
	try {
		if (proxy === '') {
			request.post({
				url: url,
				method: 'POST',
				headers: headers,
				formData
			}, function (error, response, body) {
				if (error) {
					console.log(error);
					event.sender.send("uploadFileResponseError" + idRender, error);
				} else {
					response['data'] = body;
					console.log(response);
					event.sender.send("uploadFileResponseSuccess" + idRender, response);
				}
			});
		} else {
			rp({
				url: url,
				method: 'POST',
				headers: headers,
				formData,
				proxy: proxy,
				simple: false,
				rejectUnauthorized: false,
				requestCert: true
			}, function (error, response, body) {
				if (error) {
					console.log(error);
					event.sender.send("uploadFileResponseError" + idRender, error);
				} else {
					response['data'] = body;
					console.log(response);
					event.sender.send("uploadFileResponseSuccess" + idRender, response);
				}
			});
		}
	} catch (e) {
		event.sender.send("uploadFileResponseError" + idRender, e);
	}
});

ipcMain.on("download", (event, file, userAgent) => {
	try {
		downloadFile(file.url, file.pathSave + file.file_name, event, userAgent, file.id);
	} catch (error) {
		event.sender.send("downloadError", error);
	}
});

function downloadFile(file_url, targetPath, event, userAgent, fileID) {
	let received_bytes = 0;
	let total_bytes = 0;
	let req;
	console.log("0 " + file_url);
	req = request({
		method: 'GET',
		headers: {'User-Agent': userAgent},
		uri: file_url,
	});
	let out = fs.createWriteStream(targetPath);
	// 1 downloading
	req.pipe(out);
	req.on('response', function (data) {
		console.log('response');
		//let cookie = getCookie(data.headers['set-cookie']);
		//console.log(cookie)
		req = request({
			method: 'GET',
			headers: {'User-Agent': userAgent},
			uri: file_url,
			followAllRedirects: true
		});
		req.pipe(out);
		req.on('response', function (data) {
			if (data.statusCode === 404) {
				return event.sender.send("downloadError" + fileID, fileID, "URL not found :" + file_url);
			}
			total_bytes = parseInt(data.headers['content-length']);
		});

		req.on('data', function (chunk) {
			received_bytes += chunk.length;
			showProgress(received_bytes, total_bytes, event, fileID);
		});
		req.on('end', function () {
			showDone(event, fileID);
		});
	});
	req.on('data', function (chunk) {
		received_bytes += chunk.length;
	});
	req.on('end', function () {
	});
}

function showProgress(received, total, event, fileID) {
	let percentage = (received * 100) / total;
	event.sender.send("downloadProgress" + fileID, fileID, percentage);
}

function showDone(event, fileID) {
	event.sender.send("downloadComplete" + fileID, fileID);
}

function getUrl(): string {
	let urlLoad = '';
	if (productionMode) {
		urlLoad = 'https://myurl/index.html';
	} else {
		urlLoad = url.format({
			pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
			protocol: "file:",
			slashes: true
		});
	}
	console.log(urlLoad);
	return urlLoad;
}

function getSizeScreen() {
	const {width, height} = screen.getPrimaryDisplay().workAreaSize
	return [width, height];
}