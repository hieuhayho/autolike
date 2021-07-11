// import {HTTP, HTTPResponse} from "@ionic-native/http";
import {Constant} from "../utils/Constant";
import {HTTP} from "./http";
import {HTTPResponse} from "./http-response";
import {Utils} from "../utils/utils";

export class PostGetRequest {
  public url: string = "";
  public taskName = "";
  public result: string = "";
  public cookie: string = "";
  public user_agent: string = "";
  public body: Map<string, string> = new Map<string, string>();
  public origin: string = 'https://www.facebook.com';
  public redirectUrl: string = '';
  public headerPost = {};
  public headerGet = {};

  public async task() {
  }

  public async sendGet(params?: object): Promise<HTTPResponse> {
    if (!params) {
      params = {};
    }
    let http: HTTP = new HTTP();
    if (this.cookie != '') {
      this.headerGet['Cookie'] = this.cookie;
    }
    if (this.user_agent == null || this.user_agent.length == 0) {
      this.headerGet['User-Agent'] = Constant.user_agent;
    } else {
      this.headerGet['User-Agent'] = this.user_agent;
    }
    let result = await http.get(this.url, params, this.headerGet);
    this.result = result.data;
    this.redirectUrl = result.redirectURL;
    return result;
  }

  public async sendPost(params: object) {
    let http: HTTP = new HTTP();
    if (this.user_agent == null || this.user_agent.length == 0) {
      this.headerPost['User-Agent'] = Constant.user_agent;
    } else {
      this.headerPost['User-Agent'] = this.user_agent;
    }
    if ("" != this.cookie) {
      this.headerPost['Cookie'] = this.cookie;
    }
    let result = await http.post(this.url, params, this.headerPost);
    this.result = result.data;
    return result;
  }

  public async uploadFile(files: Array<any>) {
    let http: HTTP = new HTTP();
    if (this.user_agent == null || this.user_agent.length == 0) {
      this.headerPost['User-Agent'] = Constant.user_agent;
    } else {
      this.headerPost['User-Agent'] = this.user_agent;
    }
    if ("" != this.cookie) {
      this.headerPost['Cookie'] = this.cookie;
    }
    let result = await http.uploadFile(this.url, files, this.headerPost);
    this.result = result.data;
    return result;
  }

  public getResult(): string {
    return this.result;
  }

  public async sleep(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('sleep for: ' + ms));
  }

}
