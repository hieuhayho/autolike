import {PostGetRequest} from "../request/post-get-request";

export class SendGetExample extends PostGetRequest {
  public proxy: string;

  constructor(proxy: string) {
    super();
    this.proxy = proxy;
  }

  async task(): Promise<any> {
    try {
      this.url = this.proxy;
      await this.sendGet();
      let result = this.result;
    } catch (e) {
      console.log(e);
    }
  }
}
