import {Utils} from "../utils/utils";

export class FacebookInitData {
    private g: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    private _fbData: Array<Object>;
    private _listNumber: Array<number>;

    constructor(fbData: Array<Object>, listNumber: Array<number>) {
        this._fbData = fbData;
        this._listNumber = listNumber;
    }


    get fbData(): Array<Object> {
        return this._fbData;
    }

    set fbData(value: Array<Object>) {
        this._fbData = value;
    }

    get listNumber(): Array<number> {
        return this._listNumber;
    }

    set listNumber(value: Array<number>) {
        this._listNumber = value;
    }

  public getFbDtsg(): string {
    let fbDtsg = '';
    for (let i = 0; i < this._fbData.length; i++) {
      let jsonArray = this._fbData[i];
      let groupKey = jsonArray[0];
      if ('DTSGInitData' == groupKey) {
        let object = jsonArray[2];
        fbDtsg = object.token;
        break;
      }
    }

    if (fbDtsg === undefined || fbDtsg.length === 0) {
      for (let i = 0; i < this._fbData.length; i++) {
        let jsonArray = this._fbData[i];
        let groupKey = jsonArray[0];
        if ('MRequestConfig' == groupKey) {
          let object = jsonArray[2];
          let dtsg = object.dtsg;
          fbDtsg = dtsg.token;
          break;
        }
      }
    }

    if (fbDtsg === undefined || fbDtsg.length === 0) {
      for (let i = 0; i < this._fbData.length; i++) {
        let jsonArray = this._fbData[i];
        let groupKey = jsonArray[0];
        if ('DTSGInitialData' == groupKey) {
          let object = jsonArray[2];
          let dtsg = object.dtsg;
          fbDtsg = dtsg.token;
          break;
        }
      }
    }
    return fbDtsg;
  }

    public getAJax(): string {
        return "AYkE4vauRJZWBr84fU1EHExi6tiR2Gxf3C8Dl_bkrIlw2kW6GGxpBBFjz3jssd40CTvERrzp3VGf-bHyQNjvE_gVPrIsgeMUe7kFudWIzm0Ctw";
    }

    public getRevision(): string {
        for (let i = 0; i < this._fbData.length; i++) {
            let jsonArray = this._fbData[i];
            let groupKey = jsonArray[0];
            if ('SiteData' == groupKey) {
                let object = jsonArray[2];
                return object.client_revision;
            }
        }
        return "";
    }

    public getDyn(): string {
        return "1KQdAmm1gxu4U4ifGh28sBBgS5UqxKcwRwAxu3-UcodUbE6u7HzE24xm6Uhx61rxicwcW4o29wmU1a852q3q5U2nwvE6W786q5Esx26UhwWwnElzaw5KzHzoaUae1AwgE5y6E52229wcq1FwKCwyxe";
    }

    private h(a) {
        a = a.toString(2);
        var b = "0".repeat(a.length - 1);
        return b + a
    }
    private i(a) {
        a = (a + "00000").match(/[01]{6}/g);
        var b = "";
        for (var c = 0; a != null && c < a.length; c++)
            b += this.g[parseInt(a[c], 2)];
        return b
    }

}
