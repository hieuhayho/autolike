import {User} from "../models/user";
import {FacebookRequest} from "src/request/facebook-request";
import {Utils} from "../utils/utils";

export class PostExample extends FacebookRequest {
    public user: User;

    constructor(user: User) {
        super(user);
    }

    async task() {
        try {
            this.url = 'https://myurl/';
            this.cookie = this.user.cookie;
            let param = await this.buildParamPostWallFacebook();
            await this.sendPost(param);
        } catch (e) {
            alert(Utils.getError(e));
        }
    }

    async buildParamPostWallFacebook() {
        let params = {};
        params['exampleParam'] = 'dataParam';
        return params;
    }
}
