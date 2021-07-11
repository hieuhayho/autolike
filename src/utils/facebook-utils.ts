import {Utils} from "./utils";

export class FacebookUtils {
    public static getUsernameFacebook(input: string): string {
        let username = '';
        try {
            if (input.includes('facebook.com')) {
                username = input.split("/")[3];
                let index = username.indexOf('profile.php?id=');
                if (index > -1) {
                    username = username.substring(index + 'profile.php?id='.length);
                }
            } else {
                username = input;
            }
        } catch (e) {
            console.log(e);
        }
        return username;
    }

    public static getNameGroupFacebook(input: string): string {
        let groupName = '';
        try {
            if (input.includes('groups')) {
                groupName = input.split("/")[4];
            } else {
                groupName = input;
            }
        } catch (e) {
            console.log(e);
        }
        return groupName;
    }

    public static getIDPostFacebook(input: string) {
        let idPost = '';
        let idGroup = '';
        if (input.includes("groups")) {
            let regexIdGroup = "groups/(.*?)/";
            idGroup = Utils.cutString(input, regexIdGroup, false);
            let regexIdPost = /\d*/g;
            let match = input.match(regexIdPost);
            for (let i = 0; i < match.length; i++) {
                idPost = match[i];
                if (idPost.length > 5) {
                    if (!idPost.includes(idGroup)) {
                        break;
                    }
                }
            }
        } else {
            let regex = /\d*/g;
            let match = input.match(regex);
            for (let i = 0; i < match.length; i++) {
                idPost = match[i];
                if (idPost.length > 6) {
                    break;
                }
            }
        }
        return idPost;
    }
}
