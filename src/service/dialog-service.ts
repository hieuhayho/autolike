import {Dialog} from "electron";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class DialogService {
    private static instance: DialogService;
    private dialog: Dialog;

    public static getInstance() {
        if (!DialogService.instance) {
            DialogService.instance = new DialogService();
        }
        return DialogService.instance;
    }

    private constructor() {
        if ((<any>window).require) {
            try {
                this.dialog = (<any>window).require("electron").remote.dialog;
            } catch (error) {
                throw error;
            }
        } else {
            console.warn("Could not load electron ipc");
        }
    }

    openDialogSaveExcel(workbook: any, fileName: string) {
        return new Promise<string>((resolve, reject) => {
            this.dialog.showSaveDialog({
                defaultPath: fileName,
                filters: [{name: 'Excel', extensions: ['xlsx']}]
            }, (fileName) => {
                if (fileName === undefined) {
                    console.log("Bạn không lưu tệp.");
                    return;
                }
                if (fileName.lastIndexOf('.xlsx') === -1) {
                    fileName = fileName + '.xlsx';
                }
                (<any>window).require("fs").writeFile(fileName, Buffer.from(workbook), (err) => {
                    if (err) {
                        alert("Đã xảy ra lỗi khi lưu tệp: " + err.message)
                    }
                    alert("Đã lưu file thành công.");
                    resolve('success');
                });
            });
        });
    }

    openDialogSaveFileHaveName(content: string, fileName: string) {
        this.dialog.showSaveDialog({
            defaultPath: fileName,
            filters: [{name: 'Text', extensions: ['txt']}]
        }, (fileName) => {
            if (fileName === undefined) {
                console.log("You didn't save the file");
                return;
            }
            if (fileName.lastIndexOf('.txt') === -1) {
                fileName = fileName + '.txt';
            }
            (<any>window).require("fs").writeFile(fileName, content, (err) => {
                if (err) {
                    alert("An error ocurred creating the file " + err.message)
                }
                alert("The file has been succesfully saved");
            });
        });
    }

    openDialogSaveFile(content: string, fileName: string) {
        this.dialog.showSaveDialog({
            defaultPath: fileName,
            filters: [{name: 'Text', extensions: ['txt']}]
        }, (fileName) => {
            if (fileName === undefined) {
                console.log("You didn't save the file");
                return;
            }
            if (fileName.lastIndexOf('.txt') === -1) {
                fileName = fileName + '.txt';
            }
            (<any>window).require("fs").writeFile(fileName, content, (err) => {
                if (err) {
                    alert("An error ocurred creating the file " + err.message)
                }

                alert("The file has been succesfully saved");
            });
        });
    }

    openDialogSaveFileByNameFile(content: string, fileName: string) {
        return new Promise<string>((resolve, reject) => {
            this.dialog.showSaveDialog({
                defaultPath: fileName,
                filters: [{name: 'Text', extensions: ['txt']}]
            }, (fileName) => {
                if (fileName === undefined) {
                    console.log("Không lưu file");
                    return;
                }
                if (fileName.lastIndexOf('.txt') === -1) {
                    fileName = fileName + '.txt';
                }
                // fileName is a string that contains the path and filename created in the save file dialog.
                (<any>window).require("fs").writeFile(fileName, content, (err) => {
                    if (err) {
                        alert("Lưu file thất bại " + err.message)
                    }
                    alert("Đã lưu file thành công.");
                    resolve('success');
                });
            });
        });
    }

    showDialogOpenFile(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [
                    {name: "text file", extensions: ["txt", "text"]}
                ],
            }, (filePaths) => {
                if (filePaths === undefined) {
                    resolve("");
                } else {
                    (<any>window).require("fs").readFile(filePaths[0], (err, data) => {
                        if (err) {
                            resolve("");
                        }
                        resolve(data.toString());
                    });
                }
            });
        });
    }
}
