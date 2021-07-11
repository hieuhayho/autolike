export class Constant {
    public static user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    public static app = (<any>window).require('electron').remote.app;
    public static userAppDataPath = Constant.app.getPath('userData');
}
