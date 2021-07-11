import {User} from "../models/user";
import {PostGetRequest} from "../request/post-get-request";
import {FacebookInitData} from "../models/facebook-init-data";
import {Utils} from "../utils/utils";

export default class GetFacebookInitData extends PostGetRequest {
  private fbData: Array<Object> = new Array<Object>();
  private listNumber: Array<number> = new Array<number>();
  public user: User;

  constructor(user?: User) {
    super();
    if (user == undefined || user == null) {
      this.user = null;
    } else {
      this.user = user;
    }
  }

  public getModelFacebookInitData(): FacebookInitData {
    let facebookInitData = new FacebookInitData(this.fbData, this.listNumber);
    return facebookInitData;
  }


  async task(): Promise<any> {
    try {
      this.url = 'https://m.facebook.com';
      if (this.user != null) {
        this.cookie = this.user.cookie;
        this.user_agent = this.user.userAgent;
      }
      await this.sendGet();
      let s = this.result;
      let regex = /handle\((.*?)\);/gm;
      let matchAllDefines = s.match(regex);
      for (let i = 0; i < matchAllDefines.length; i++) {
        if (matchAllDefines[i].includes('handle({"define')) {
          let strDefines = matchAllDefines[i];
          let match = strDefines.match(/handle\((.*?)\);/);
          let ja = JSON.parse(match[1]);
          for (let y = 0; y < ja.define.length; y++) {
            let childJa = ja.define[y];
            this.fbData.push(childJa);
            let number = childJa[3];
            if (number >= 0) {
              this.listNumber.push(number);
            }
          }
          break;
        }
      }
      let m;
      regex = /define:\[(.*?)\]\]/g;
      while ((m = regex.exec(s)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        // defines = "[" + defines + "]]";
        let defines = "[" + m[1] + "]]";
        // defines = defines.replace("define:", "");
        try {
          let ja = eval(defines);
          for (let y = 0; y < ja.length; y++) {
            let childJa = ja[y];
            let number = childJa[3];
            if (number >= 0) {
              this.listNumber.push(number);
            }
          }
        } catch (e) {
          console.log(e);
          console.log(defines);
        }
      }
    } catch (e) {
      alert(Utils.getError(e));
    }
  }

  public load(s: string) {
    let regex = /handle\((.*?)\);/;
    let match = s.match(regex);
    for (let i = 1; i < match.length; i++) {
      if (match[i].includes('handle({"define')) {
        let ja = JSON.parse(match[i]);
        for (let y = 0; y < ja.define.length; y++) {
          let childJa = ja.define[y];
          this.fbData.push(childJa);
          let number = childJa[3];
          if (number >= 0) {
            this.listNumber.push(number);
          }
        }
        break;
      }
    }
    let m;
    regex = /define:\[(.*?)\]\]/g;
    while ((m = regex.exec(s)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // defines = "[" + defines + "]]";
      let defines = "[" + m[1] + "]]";
      // defines = defines.replace("define:", "");
      try {
        let ja = eval(defines);
        for (let y = 0; y < ja.length; y++) {
          let childJa = ja[y];
          let number = childJa[3];
          if (number >= 0) {
            this.listNumber.push(number);
          }
        }
      } catch (e) {
        console.log(e);
        console.log(defines);
      }
    }

    // regex = /define:\[(.*?)\]\]/g;
    // match = s.match(regex);
    // for (let i = 1; i < match.length; i++) {
    //     let defines = "[" + match[i] + "]]"; // pretty json
    //     try {
    //         let ja = eval(defines);
    //         for (let y = 0; y < ja.length; y++) {
    //             let childJa = ja[y];
    //             let number = childJa[3];
    //             if (number >= 0) {
    //                 this.listNumber.push(number);
    //             }
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // this.listNumber = [1237, 329, 619, 141, 3871, 3914, 490, 270, 51, 3419, 2190, 2111, 1634, 330, 323, 317, 2609, 185, 907, 527, 3016, 1978, 46, 2580, 254, 278, 279, 1478, 2104, 3401, 2023, 288, 876, 2827, 3405, 772, 54, 1496, 1127, 1109, 60, 32, 52, 551, 1726, 329, 619, 141, 3871, 3914, 490, 270, 51, 3419, 2190, 2111, 1634, 330, 323, 317, 2104, 3401, 527, 1478, 46, 1127, 185, 1237, 2609, 278, 279, 2023, 907, 288, 551, 2580, 876, 2827, 3405, 772, 54, 1496, 1109, 1978, 254, 31, 423, 3016, 1726, 3504, 395, 27, 3463, 3763, 669, 3506, 273, 3674, 2469, 2981, 1059, 911, 368, 1081, 1258, 2781, 32, 52, 3790, 3904, 3019, 3003, 165, 615, 1271, 2712, 344, 2886, 3105, 3667, 436, 2764, 2735, 2342, 3607, 3386, 2166, 1145, 60];

  }

}
