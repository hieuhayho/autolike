import {FacebookInitData} from "./facebook-init-data";

export class User {
    private _userId: string;
    private _cookie: string;
    private _userAgent: string;
    private _facebookInitData: FacebookInitData;

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get cookie(): string {
        return this._cookie;
    }

    set cookie(value: string) {
        this._cookie = value;
    }

    get userAgent(): string {
        return this._userAgent;
    }

    set userAgent(value: string) {
        this._userAgent = value;
    }

    get facebookInitData(): FacebookInitData {
        return this._facebookInitData;
    }

    set facebookInitData(value: FacebookInitData) {
        this._facebookInitData = value;
    }
}
