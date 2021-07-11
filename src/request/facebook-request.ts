import {PostGetRequest} from "./post-get-request";
import {User} from "../models/user";
import {HTTPResponse} from "./http-response";

export class FacebookRequest extends PostGetRequest {
    public user: User;
    public headerPost = {
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        'Connection': 'keep-alive',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Response-Format': 'JSONStream',
        'Referer': 'https://www.facebook.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Language': 'vi,fr-FR;q=0.9,fr;q=0.8,en-US;q=0.7,en;q=0.6',
        'Origin': 'https://www.facebook.com',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Accept': '*/*'
    };
    public headerGet = {
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'accept-language': 'vi,fr-FR;q=0.9,fr;q=0.8,en-US;q=0.7,en;q=0.6',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    };

    constructor(user: User) {
        super();
        if (user != null && user.userAgent != undefined) {
            this.user_agent = user.userAgent;
        }
        this.user = user;

    }


    async task(): Promise<any> {
        super.task();
    }


    async sendGet(): Promise<HTTPResponse> {
        return await super.sendGet();
    }

    onError(message: string) {
        alert(message);
    }

    async sendPost(params: object): Promise<HTTPResponse> {
        return await super.sendPost(params);
    }
}
