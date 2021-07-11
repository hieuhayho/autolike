import {User} from "../models/user";
import {FacebookRequest} from "src/request/facebook-request";
import {Utils} from "../utils/utils";
import {ToastControl} from "../controls/toast-control";

export class LikePost extends FacebookRequest {
    public user: User;
    public listId: Array<string>;

    constructor(user: User, listId: Array<string>) {
        super(user);
        this.user = user;
        this.listId = listId;
    }

    async task() {
        try {
            for (let i = 0; i < this.listId.length; i++) {
                let idPost = this.listId[i];
                this.url = 'https://www.facebook.com/api/graphql/';
                this.cookie = this.user.cookie;
                this.user_agent = this.user.userAgent;
                let param = await this.buildParamLikeFacebook(idPost);
                await this.sendPost(param);
                let result = this.result;
                let jsonData = JSON.parse(result);
                let history = '';
                try {
                    if (jsonData.data.feedback_react.feedback.id) {
                        history = 'Đã thả tim thành công bài viết có id: ' + idPost + '\n';
                    } else {
                        history = 'Đã thả tim thất bại bài viết có id: ' + idPost + '\n';
                    }
                } catch (e) {
                    console.log(e);
                    history = 'Đã thả tim thất bại bài viết có id: ' + idPost + '\n';
                }
                let historyInput: any = document.getElementById('history');
                historyInput.value += history;
                await this.sleep(10000);
            }
        } catch (e) {
            alert(Utils.getError(e));
        }
    }

    async buildParamLikeFacebook(idPost) {
        let params = {};
        let feedbackId = 'feedback:' + idPost;
        feedbackId = btoa(feedbackId);
        params['av'] = this.user.userId;
        params['__user'] = this.user.userId;
        params['__a'] = '1';
        params['__dyn'] = this.user.facebookInitData.getDyn();
        params['__csr'] = '';
        params['__req'] = Utils.makeid(2);
        params['__beoa'] = '0';
        params['__pc'] = 'EXP2:comet_pkg';
        params['dpr'] = '1';
        params['__ccg'] = 'EXCELLENT';
        params['__rev'] = this.user.facebookInitData.getRevision();
        params['__s'] = Utils.makeid(6) + ':' + Utils.makeid(6) + ':' + Utils.makeid(6);
        params['__hsi'] = '6' + Utils.makeNumber(19) + '-0';
        params['__comet_req'] = '0';
        params['__comet_env'] = 'fb';
        params['fb_dtsg'] = this.user.facebookInitData.getFbDtsg();
        params['jazoest'] = Utils.getNumericValue(this.user.facebookInitData.getFbDtsg());
        params['__spin_r'] = this.user.facebookInitData.getRevision();
        params['__spin_b'] = 'trunk';
        params['__spin_t'] = Utils.getSpinT();
        params['fb_api_caller_class'] = 'RelayModern';
        params['fb_api_req_friendly_name'] = 'CometUFIFeedbackReactMutation';
        params['variables'] = '{"input":{"feedback_id":"' + feedbackId + '","feedback_reaction":2,"feedback_source":"PROFILE","feedback_referrer":"/","is_tracking_encrypted":true,"session_id":"' + Utils.getLoggingInteractionKey() + '","actor_id":"' + this.user.userId + '","client_mutation_id":"3"},"useDefaultActor":false}';
        params['server_timestamps'] = 'true';
        params['doc_id'] = '3928142190617090';
        return params;
    }
}
