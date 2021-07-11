import {AfterViewInit, Component} from "@angular/core";
import {Utils} from "../utils/utils";
import {SqlManager} from "../service/sql-manager";
import {Constant} from "../utils/Constant";
import {User} from "../models/user";
import {FacebookInitData} from "../models/facebook-init-data";
import GetFacebookInitData from "../get-request/get-facebook-init-data";
import {LikePost} from "../post-request/like-post";

declare let $: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
    public fullCookie: string = '';
    public listUIDString: string = '';
    public user: User = new User();

    constructor() {
    }

    async ngAfterViewInit() {
        SqlManager.getInstance();
        let pathFolder = Constant.userAppDataPath;
        let pathDataAccount = pathFolder + '/DataAccount';
        const remote = (<any>window).require('electron').remote;
        (<any>window).alert = function (str) {
            str = Utils.toString(str);
            var options = {
                type: 'warning',
                buttons: ["Ok"],
                defaultId: 0,
                cancelId: 0,
                detail: str,
                message: ''
            };
            remote.dialog.showMessageBox(remote.getCurrentWindow(), options)
        };
        (<any>window).confirm = function (message) {
            message = Utils.toString(message);
            const buttonIdx = remote.dialog.showMessageBox(null, {
                type: 'question',
                buttons: ['OK', 'Cancel'],
                defaultId: 0,
                cancelId: 1,
                detail: message,
                message: ''
            });
            return buttonIdx === 0;
        };
        // right mouse click
        let Menu = remote.Menu;
        let MenuItem = remote.MenuItem;
        const menu = new Menu();
        const menuItemCopy = new MenuItem({
            label: 'Copy',
            accelerator: "CmdOrCtrl+C",
            selector: "copy:",
            click: function () {
                document.execCommand("copy");
            }
        });
        const menuItemPaste = new MenuItem({
            label: 'Paste',
            accelerator: "CmdOrCtrl+V",
            selector: "paste:",
            click: function () {
                document.execCommand("paste");
            }
        });
        const menuItemCut = new MenuItem({
            label: 'Cut',
            accelerator: "CmdOrCtrl+X",
            selector: "cut:",
            click: function () {
                document.execCommand("cut");
            }
        });
        menu.append(menuItemCopy);
        menu.append(menuItemPaste);
        menu.append(menuItemCut);
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            menu.popup(remote.getCurrentWindow())
        }, false);
    }

    async login() {
        this.user.userId = Utils.cutStringStartEnd(this.fullCookie, 'c_user=', ';');
        this.user.userAgent = this.fullCookie.split('|')[1];
        this.user.cookie = this.fullCookie.split('|')[0];
        let getFacebookInitData: GetFacebookInitData = new GetFacebookInitData(this.user);
        await getFacebookInitData.task();
        this.user.facebookInitData = getFacebookInitData.getModelFacebookInitData();
    }

    public loadBtn(b) {
        if (b) {
            document.getElementById('btnRunTask').style.opacity = '0.5';
            document.getElementById('btnRunTask').innerText = 'Đang chạy';
            document.getElementById('btnRunTask').setAttribute('disabled', 'true');
        } else {
            document.getElementById('btnRunTask').style.opacity = '1';
            document.getElementById('btnRunTask').innerText = 'Chạy ngay đi';
            document.getElementById('btnRunTask').removeAttribute('disabled');
        }
    }

    async runTask() {
        this.loadBtn(true);
        let listId = this.convertStringToArray();
        let likePost: LikePost = new LikePost(this.user, listId);
        await likePost.task();
        this.loadBtn(false);
    }

    public convertStringToArray() {
        let newListID: Array<string> = new Array<string>();
        if (this.listUIDString.includes('\n')) {
            newListID = this.listUIDString.split('\n');
        } else {
            if (this.listUIDString) {
                newListID.push(this.listUIDString);
            }
        }
        return newListID;
    }

    async downloadFile(url, savePath) {
        return new Promise<any>((resolve, reject) => {
            const http = (<any>window).require('http');
            const fs = (<any>window).require('fs');
            const file = fs.createWriteStream(savePath);
            const request = http.get(url, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    resolve();
                });

                file.on('error', function (err) {
                    console.log(err);
                    alert('fail save file to path: ' + savePath + '\n' + err);
                    resolve();
                });
            }).on('error', function (err) { // Handle errors
                alert(err);
                resolve();
            });
        });
    }
}
