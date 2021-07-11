import {HTTPResponse} from './http-response';
import {IpcRenderer} from "electron";

export class HTTP {
    private ipc: IpcRenderer;

    constructor() {
        if ((<any>window).require) {
            try {
                this.ipc = (<any>window).require("electron").ipcRenderer;
            } catch (error) {
                throw error;
            }
        } else {
            console.warn("Could not load electron ipc");
        }
    }

    public async get(url: string, params: Object, headers: Object): Promise<HTTPResponse> {
        let idRender = this.makeid();
        return new Promise<HTTPResponse>((resolve, reject) => {
            this.ipc.once("getRequestResponseSuccess" + idRender, (event, arg) => {
                resolve(arg);
                this.ipc.removeAllListeners("getRequestResponseError" + idRender);
            });

            this.ipc.once("getRequestResponseError" + idRender, (event, arg) => {
                reject(arg);
                this.ipc.removeAllListeners("getRequestResponseSuccess" + idRender);
            });
            let urlProxy = '';
            this.ipc.send("getRequest", {
                proxy: urlProxy,
                url: url,
                params: params,
                headers: headers,
                keyRender: idRender
            });
        });
    }

    public async uploadFile(url: string, files: Array<any>, headers: Object): Promise<HTTPResponse> {
        let idRender = this.makeid();
        return new Promise<HTTPResponse>((resolve, reject) => {
            this.ipc.once("uploadFileResponseSuccess" + idRender, (event, arg) => {
                resolve(arg);
                this.ipc.removeAllListeners("uploadFileResponseError" + idRender);
            });

            this.ipc.once("uploadFileResponseError" + idRender, (event, arg) => {
                reject(arg);
                this.ipc.removeAllListeners("uploadFileResponseSuccess" + idRender);
            });
            this.ipc.send("uploadFile", {url: url, files: files, headers: headers, keyRender: idRender});
        });
    }

    public async post(url: string, params: Object, headers: Object): Promise<HTTPResponse> {
        let query = this.buildQueryString(params);
        let length = query.length;
        let idRender = this.makeid();
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        headers["Content-Length"] = length;
        return new Promise<HTTPResponse>((resolve, reject) => {
            this.ipc.once("postRequestResponseSuccess" + idRender, (event, arg) => {
                resolve(arg);
                this.ipc.removeAllListeners("postRequestResponseError" + idRender);
            });

            this.ipc.once("postRequestResponseError" + idRender, (event, arg) => {
                reject(arg);
                this.ipc.removeAllListeners("postRequestResponseSuccess" + idRender);
            });
            let urlProxy = '';
            this.ipc.send("postRequest", {
                proxy: urlProxy,
                url: url,
                params: query,
                headers: headers,
                keyRender: idRender
            });
        });
    }

    private buildQueryString(params): String {
        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        return query;
    }

    private makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}
