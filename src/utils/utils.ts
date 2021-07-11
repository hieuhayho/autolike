import {Md5} from 'ts-md5/dist/md5';
import {User} from "../models/user";

declare let $: any;
declare let unescape: any;

export class Utils {
    public static version: string = "1.0";
    public static visitor: any;
    public static emoticonDefine = {
        smile: {title: "Smile", codes: [":)", ":=)", ":-)"]},
        "sad-smile": {title: "Sad Smile", codes: [":(", ":=(", ":-("]},
        "big-smile": {title: "Big Smile", codes: [":D", ":=D", ":-D", ":d", ":=d", ":-d"]},
        cool: {title: "Cool", codes: ["8)", "8=)", "8-)", "B)", "B=)", "B-)", "(cool)"]},
        wink: {title: "Wink", codes: [":o", ":=o", ":-o", ":O", ":=O", ":-O"]},
        crying: {title: "Crying", codes: [";(", ";-(", ";=("]},
        sweating: {title: "Sweating", codes: ["(sweat)", "(:|"]},
        speechless: {title: "Speechless", codes: [":|", ":=|", ":-|"]},
        kiss: {title: "Kiss", codes: [":*", ":=*", ":-*"]},
        "tongue-out": {title: "Tongue Out", codes: [":P", ":=P", ":-P", ":p", ":=p", ":-p"]},
        blush: {title: "Blush", codes: ["(blush)", ":$", ":-$", ":=$", ':">']},
        wondering: {title: "Wondering", codes: [":^)"]},
        sleepy: {title: "Sleepy", codes: ["|-)", "I-)", "I=)", "(snooze)"]},
        dull: {title: "Dull", codes: ["|(", "|-(", "|=("]},
        "in-love": {title: "In love", codes: ["(inlove)"]},
        "evil-grin": {title: "Evil grin", codes: ["]:)", ">:)", "(grin)"]},
        talking: {title: "Talking", codes: ["(talk)"]},
        yawn: {title: "Yawn", codes: ["(yawn)", "|-()"]},
        puke: {title: "Puke", codes: ["(puke)", ":&", ":-&", ":=&"]},
        "doh!": {title: "Doh!", codes: ["(doh)"]},
        angry: {title: "Angry", codes: [":@", ":-@", ":=@", "x(", "x-(", "x=(", "X(", "X-(", "X=("]},
        "it-wasnt-me": {title: "It wasn't me", codes: ["(wasntme)"]},
        party: {title: "Party!!!", codes: ["(party)"]},
        worried: {title: "Worried", codes: [":S", ":-S", ":=S", ":s", ":-s", ":=s"]},
        mmm: {title: "Mmm...", codes: ["(mm)"]},
        nerd: {title: "Nerd", codes: ["8-|", "B-|", "8|", "B|", "8=|", "B=|", "(nerd)"]},
        "lips-sealed": {title: "Lips Sealed", codes: [":x", ":-x", ":X", ":-X", ":#", ":-#", ":=x", ":=X", ":=#"]},
        hi: {title: "Hi", codes: ["(hi)"]},
        call: {title: "Call", codes: ["(call)"]},
        devil: {title: "Devil", codes: ["(devil)"]},
        angel: {title: "Angel", codes: ["(angel)"]},
        envy: {title: "Envy", codes: ["(envy)"]},
        wait: {title: "Wait", codes: ["(wait)"]},
        bear: {title: "Bear", codes: ["(bear)", "(hug)"]},
        "make-up": {title: "Make-up", codes: ["(makeup)", "(kate)"]},
        "covered-laugh": {title: "Covered Laugh", codes: ["(giggle)", "(chuckle)"]},
        "clapping-hands": {title: "Clapping Hands", codes: ["(clap)"]},
        thinking: {title: "Thinking", codes: ["(think)", ":?", ":-?", ":=?"]},
        bow: {title: "Bow", codes: ["(bow)"]},
        rofl: {title: "Rolling on the floor laughing", codes: ["(rofl)"]},
        whew: {title: "Whew", codes: ["(whew)"]},
        happy: {title: "Happy", codes: ["(happy)"]},
        smirking: {title: "Smirking", codes: ["(smirk)"]},
        nodding: {title: "Nodding", codes: ["(nod)"]},
        shaking: {title: "Shaking", codes: ["(shake)"]},
        punch: {title: "Punch", codes: ["(punch)"]},
        emo: {title: "Emo", codes: ["(emo)"]},
        yes: {title: "Yes", codes: ["(y)", "(Y)", "(ok)"]},
        no: {title: "No", codes: ["(n)", "(N)"]},
        handshake: {title: "Shaking Hands", codes: ["(handshake)"]},
        skype: {title: "Skype", codes: ["(skype)", "(ss)"]},
        heart: {title: "Heart", codes: ["(h)", "<3", "(H)", "(l)", "(L)"]},
        "broken-heart": {title: "Broken heart", codes: ["(u)", "(U)"]},
        mail: {title: "Mail", codes: ["(e)", "(m)"]},
        flower: {title: "Flower", codes: ["(f)", "(F)"]},
        rain: {title: "Rain", codes: ["(rain)", "(london)", "(st)"]},
        sun: {title: "Sun", codes: ["(sun)"]},
        time: {title: "Time", codes: ["(o)", "(O)", "(time)"]},
        music: {title: "Music", codes: ["(music)"]},
        movie: {title: "Movie", codes: ["(~)", "(film)", "(movie)"]},
        phone: {title: "Phone", codes: ["(mp)", "(ph)"]},
        coffee: {title: "Coffee", codes: ["(coffee)"]},
        pizza: {title: "Pizza", codes: ["(pizza)", "(pi)"]},
        cash: {title: "Cash", codes: ["(cash)", "(mo)", "($)"]},
        muscle: {title: "Muscle", codes: ["(muscle)", "(flex)"]},
        cake: {title: "Cake", codes: ["(^)", "(cake)"]},
        beer: {title: "Beer", codes: ["(beer)"]},
        drink: {title: "Drink", codes: ["(d)", "(D)"]},
        dance: {title: "Dance", codes: ["(dance)", "\\o/", "\\:D/", "\\:d/"]},
        ninja: {title: "Ninja", codes: ["(ninja)"]},
        star: {title: "Star", codes: ["(*)"]},
        mooning: {title: "Mooning", codes: ["(mooning)"]},
        finger: {title: "Finger", codes: ["(finger)"]},
        bandit: {title: "Bandit", codes: ["(bandit)"]},
        drunk: {title: "Drunk", codes: ["(drunk)"]},
        smoking: {title: "Smoking", codes: ["(smoking)", "(smoke)", "(ci)"]},
        toivo: {title: "Toivo", codes: ["(toivo)"]},
        rock: {title: "Rock", codes: ["(rock)"]},
        headbang: {title: "Headbang", codes: ["(headbang)", "(banghead)"]},
        bug: {title: "Bug", codes: ["(bug)"]},
        fubar: {title: "Fubar", codes: ["(fubar)"]},
        poolparty: {title: "Poolparty", codes: ["(poolparty)"]},
        swearing: {title: "Swearing", codes: ["(swear)"]},
        tmi: {title: "TMI", codes: ["(tmi)"]},
        heidy: {title: "Heidy", codes: ["(heidy)"]},
        myspace: {title: "MySpace", codes: ["(MySpace)"]},
        malthe: {title: "Malthe", codes: ["(malthe)"]},
        tauri: {title: "Tauri", codes: ["(tauri)"]},
        priidu: {title: "Priidu", codes: ["(priidu)"]}
    };
    // public static u:any;
    private static jsEscapeRegex = /\\(u\{([0-9A-Fa-f]+)\}|u([0-9A-Fa-f]{4})|x([0-9A-Fa-f]{2})|([1-7][0-7]{0,2}|[0-7]{2,3})|(['"tbrnfv0\\]))|\\U([0-9A-Fa-f]{8})/g;

    private static usualEscapeSequences = {
        '0': '\0',
        'b': '\b',
        'f': '\f',
        'n': '\n',
        'r': '\r',
        't': '\t',
        'v': '\v',
        '\'': '\'',
        '"': '"',
        '\\': '\\'
    };


    public static splitArray(listArray, n) {
        let [...arr] = listArray;
        let res = [];
        while (arr.length) {
            res.push(arr.splice(0, n));
        }
        return res;
    }

    public static cloneObject(from, to) {
        if (from == null || typeof from != "object") return from;
        if (from.constructor != Object && from.constructor != Array) return from;
        if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
            from.constructor == String || from.constructor == Number || from.constructor == Boolean)
            return new from.constructor(from);
        to = to || new from.constructor();
        for (var name in from) {
            to[name] = typeof to[name] == "undefined" ? Utils.cloneObject(from[name], null) : to[name];
        }
        return to;
    }

    public static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public static convertStringToList(string: string) {
        let listData: Array<string> = new Array<string>();
        if (string) {
            if (string.includes('\n')) {
                let listTemp = string.split('\n');
                for (let z = 0; z < listTemp.length; z++) {
                    if (listTemp[z]) {
                        listData.push(listTemp[z]);
                    }
                }
            } else {
                if (string) {
                    listData.push(string);
                }
            }
        }
        return listData;
    }

    public static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    private static fromHex = (str) => String.fromCodePoint(parseInt(str, 16));
    private static fromOct = (str) => String.fromCodePoint(parseInt(str, 8));

    public static OS: String = "";

    public static cutString(original: string, regex: any, isFullMatch: boolean) {
        let match = original.match(regex);
        if (isFullMatch) {
            return match[0];
        }
        if (match != null && match.length === 2) {
            return match[1];
        }
        return '';
    }

    public static formatDay(timestamp): string {
        let date: Date = new Date(timestamp * 1000);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    public static convertDateToTimestamp(myday: string) {
        let myDate = myday.split("/");
        let newDate = new Date(Number(myDate[2]), Number(myDate[1]) - 1, Number(myDate[0]));
        return (newDate.getTime() / 1000);
    }

    public static getCurrentMonthDay() {
        var today = new Date();
        var day = String(today.getDate());
        if (day.length === 1) {
            day = '0' + day;
        }
        var month = String((today.getMonth() + 1));
        if (month.length === 1) {
            month = '0' + month;
        }
        return month + '/' + day;
    }

    public static currentDate(): string {
        var today = new Date();
        var dd = String(today.getDate());
        var mm = String(today.getMonth() + 1); //January is 0!
        var yyyy = today.getFullYear();
        let todayNow = dd + '/' + mm + '/' + yyyy;
        return todayNow;
    }

    public static convertHtmltoDom(html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        return doc;
    }

    public static getNumberInString(string) {
        let txt = string;
        let numb = txt.match(/\d/g);
        numb = numb.join("");
        return numb;
    }

    public static stripHtml(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    public static decodeURI(link: string) {
        link = link.replace(new RegExp("\\\\", "g"), "");
        return link;
    }

    public static checkInputWhileSpace(str) {
        if (!str.replace(/\s/g, '').length) {
            return true;
        } else {
            return false;
        }
    }

    public static convertPathToBase64(path: string) {
        return new Promise<string>(resolve => {
            try {
                var fs = (<any>window).require('fs');
                var bitmap = fs.readFileSync(path);
                let base64 = new Buffer(bitmap).toString('base64');
                if (base64.includes('jpg') || base64.includes('jpeg')) {
                    base64 = 'data:image/jpeg;base64,' + base64;
                } else if (base64.includes('png')) {
                    base64 = 'data:image/png;base64,' + base64;
                } else {
                    base64 = 'data:image/jpeg;base64,' + base64;
                }
                resolve(base64);
            } catch (e) {
                console.log(e);
            }
        });
    }

    public static decodeHTML(html) {
        return $("<div/>").html(html).text()
    }

    public static getCurrentTime() {
        let today = new Date();
        let day = String(today.getDate());
        if (day.length === 1) {
            day = '0' + day;
        }
        let month = String((today.getMonth() + 1));
        if (month.length === 1) {
            month = '0' + month;
        }
        let hours = String(today.getHours());
        if (hours.length === 1) {
            hours = '0' + hours;
        }
        let munites = String(today.getMinutes());
        if (munites.length === 1) {
            munites = '0' + munites;
        }
        let date = day + '-' + month + '-' + today.getFullYear();
        let times = hours + ":" + munites;
        let dateTime = date + ' ' + times;
        return dateTime;
    }

    public static getdhm(timestamp) {
        var date = new Date(Number(timestamp));
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let formattedTime = day + '/' + month + '/' + year;
        return formattedTime;

    }

    public static convertMd5(input) {
        var crypto = (<any>window).require('crypto');
        return crypto.createHash('md5').update(input).digest("hex");
    }

    public static makeid(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static checkHDH() {
        var opsys: any = process.platform;
        let hdh = '';
        if (opsys === 'darwin') {
            hdh = 'macos';
        } else if (opsys === 'win32' || opsys == 'win64') {
            hdh = opsys;
        } else if (opsys === 'linux') {
            hdh = opsys;
        }
        return hdh;
    }

    public static select(m: string, fullMess: string) {
        let choices = m.split("|");
        let index = Math.floor(Math.random() * choices.length) + 0;
        fullMess = fullMess.replace('{' + m + '}', choices[index]);
        return fullMess;
    }

    public static paramPostGraphDesktop(user: User, params: any) {
        let facebookInitData = user.facebookInitData;
        params['av'] = user.userId;
        params['__user'] = user.userId;
        params['__a'] = '1';
        params['__dyn'] = facebookInitData.getDyn();
        params['__csr'] = '';
        params['__req'] = Utils.makeid(2);
        params['__beoa'] = '0';
        params['__pc'] = 'EXP2:comet_pkg';
        params['dpr'] = '1';
        params['__ccg'] = 'EXCELLENT';
        params['__rev'] = facebookInitData.getRevision();
        params['__s'] = Utils.makeid(6) + ':' + Utils.makeid(6) + ':' + Utils.makeid(6);
        params['__hsi'] = '6' + Utils.makeNumber(19) + '-0';
        params['__comet_req'] = '0';
        params['__comet_env'] = 'fb';
        params['fb_dtsg'] = facebookInitData.getFbDtsg();
        params['jazoest'] = Utils.getNumericValue(facebookInitData.getFbDtsg());
        params['__spin_r'] = facebookInitData.getRevision();
        params['__spin_b'] = 'trunk';
        params['__spin_t'] = Utils.getSpinT();
        return params;
    }

    public static cutStringEnd(orginal: string, startString: string, endString: string): string {
        let result = '';
        let indexStart = orginal.indexOf(startString);
        if (indexStart > -1) {
            indexStart = indexStart + startString.length;
            let indexEnd = orginal.indexOf(endString, indexStart);
            if (indexEnd > -1) {
                result = orginal.substring(indexStart, indexEnd);
            }
        }
        return result;
    }

    public static replaceAll(original: string, search: string, replacement: string): string {
        let target = original;
        return target.replace(new RegExp(search, 'g'), replacement);
    }


    public static maxNumber(listNumber: Array<number>): number {
        if (listNumber.length === 0) {
            return null;
        }
        let max;
        for (let i = 0; i < listNumber.length; i++) {
            if (i === 0) {
                max = listNumber[i];
                continue;
            }
            if (listNumber[i] > max) {
                max = listNumber[i];
            }
        }
        return max;
    }

    static getNewClientID(): string {
        let a = Date.now().toString();
        let b = Utils.g(0, 4294967295) + 1;
        a = a + ":" + b.toString();
        return encodeURIComponent(a);
    }

    static getClientID() {
        let i = Math.floor(Math.random() * 2147483648);
        return i.toString(16);
    }

    private static g(a: number, b: number) {
        return Math.floor(a + Math.random() * (b - a));
    }

    static getLoggingInteractionKey() {
        let pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        let split = pattern.split('');
        for (let i = 0; i < split.length; i++) {
            let b = Math.floor(Math.random() * 16);
            let char = split[i];
            if (char != '4' && char != '-') {
                let a;
                if (char === 'x') {
                    a = b;
                } else {
                    a = b & 3 | 8;
                }
                split[i] = a.toString(16).split('')[0];
            }
        }
        let result = '';
        for (let i = 0; i < split.length; i++) {
            result += split[i];
        }
        return result;
    }

    static escape_HTML(html_str: string) {
        'use strict';
        return html_str.replace(/[&<>"]/g, function (tag) {
            let chars_to_replace = {
                '&': '&',
                '<': '<',
                '>': '>',
                '"': '"'
            };
            return chars_to_replace[tag] || tag;
        });
    }

    public static cutStringDelete(original: string, deleteString: string) {
        let result = '';
        let index = original.indexOf(deleteString);
        if (index > -1) {
            result = original.substring(deleteString.length);
        }
        return result;
    }

    public static unescape(string) {
        return string.replace(Utils.jsEscapeRegex, (_, __, varHex, longHex, shortHex, octal, specialCharacter, python) => {
            if (varHex !== undefined) {
                return Utils.fromHex(varHex);
            } else if (longHex !== undefined) {
                return Utils.fromHex(longHex);
            } else if (shortHex !== undefined) {
                return Utils.fromHex(shortHex);
            } else if (octal !== undefined) {
                return Utils.fromOct(octal);
            } else if (python !== undefined) {
                return Utils.fromHex(python);
            } else {
                return Utils.usualEscapeSequences[specialCharacter];
            }
        });
    }

    public static getRandomIntegerInRange(min: number, max: number) {
        let randomIndex = Math.floor(Math.random() * (max - min) + min);
        return randomIndex;
    }

    public static getRandomElementInArray(array): any {
        let max = array.length;
        let min = 0;
        let randomIndex = Math.floor(Math.random() * (max - min) + min);
        let element = array[randomIndex];
        return element;
    }

    public static cutStringStartEnd(orginal: string, startString: string, endString: string): string {
        let result = '';
        let indexStart = orginal.indexOf(startString);
        if (indexStart > -1) {
            indexStart = indexStart + startString.length;
            let indexEnd = orginal.indexOf(endString, indexStart);
            if (indexEnd > -1) {
                result = orginal.substring(indexStart, indexEnd);
            }
        }
        return result;
    }

    public static shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    public static formatDate(date: Date): string {
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' - ' + date.getDate() + "/" + (date.getMonth() + 1);
    }

    public static buildTTStamp(fb_dtsg: string): string {
        let n = '';
        for (let o = 0; o < fb_dtsg.length; o++) {
            n += String(fb_dtsg.codePointAt(o));
        }
        n = '2' + n;
        return n;
    }

    public static checkPhoneSaveOrder(phone) {
        if (!phone || phone.length > 11 || phone.length < 10) {
            return 'Số điện thoại nhập không đúng định dạng';
        }
        if (!Utils.onlyContainsNumber(phone)) {
            return 'Số điện thoại nhập không đúng định dạng';
        }
        if (phone[0] !== '0') {
            return 'Số điện thoại phải bắt đầu bằng số 0';
        }
        return 'ok';
    }

    public static onlyContainsNumber(s: string): boolean {
        return !/\D/.test(s);
    }

    public static getSpinT() {
        return Math.round(new Date().getTime() / 1000);
    }

    public static GetHexString(bt: string): string {
        let s: string = "";
        for (let i = 0; i < bt.length; i++) {
            let b = bt.charCodeAt(i);
            let n, n1, n2;
            n = b;
            n1 = n & 15;
            n2 = (n >> 4) & 15;
            if (n2 > 9) {
                s += (n2 - 10 + parseInt('A')).toString();
            } else {
                s += n2.toString();
            }
            if (n1 > 9) {
                s += (n1 - 10 + parseInt('A')).toString();
            } else {
                s += n1.toString();
            }
            if ((i + 1) != bt.length && (i + 1) % 2 == 0) {
                s += "-";
            }
        }
        return s;
    }

    public static getHWIDEncrypted(HWID: string): string {
        let hex = "";
        try {

            hex = Utils.GetHexString(Md5.hashStr(HWID).toString());
        } catch (e) {
            alert('Lỗi khi tạo key: ' + e.stack);
            console.log(e);
        }
        return hex;
    }

    static execute(command) {
        return new Promise<any>((resolve, reject) => {
            let exec = (<any>window).require('child_process').exec;
            exec(command, function (error, stdout, stderr) {
                resolve(stdout);
            });
        });
    };

    public static getNumericValue(a) {
        let c = 0;
        for (var d = 0; d < a.length; d++)
            c += a.charCodeAt(d);

        return '2' + c.toString();
    }

    public static getError(e) {
        let error = '';
        if (e.message) {
            error += e.message + '\n';
        }
        if (e.stack) {
            error += e.stack + '\n';
        }
        try {
            error += JSON.stringify(e) + '\n';
        } catch (e) {
            error += e.toString();
        }
        return 'đã xảy ra lỗi : ' + error;
    }

    public static toString(e) {
        let string = '';
        if (typeof e === 'string') {
            string = e;
        } else {
            try {
                string += e.toString();
            } catch (e) {
                string += JSON.stringify(e) + '\n';
            }
        }
        return string;
    }

    public static async sleep(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then();
    }

    public static currentYear(): string {
        var today = new Date();
        var yyyy = String(today.getFullYear());
        return yyyy;
    }

    public static convertTimestampToDateTime(time) {
        let date_ob = new Date(Number(time));
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        var hours = ("0" + date_ob.getHours()).slice(-2);
        var minutes = ("0" + date_ob.getMinutes()).slice(-2);
        var seconds = ("0" + date_ob.getSeconds()).slice(-2);
        return {date: date + '/' + month + '/' + year, time: hours + ":" + minutes + ":" + seconds};
    }

    public static makeNumber(length) {
        let result = '';
        let characters = '0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static randomNumber(min, max) {
        min = Number(min);
        max = Number(max);
        return Math.ceil(min + Math.random() * (max - min));
    }

    public static getStringTime(date: Date): string { // DD-MM-YYYY HH:mm
        let day = String(date.getDate());
        let month = String((date.getMonth() + 1));
        let year = String(date.getFullYear());
        let hour = String(date.getHours());
        let minute = String(date.getMinutes());
        let second = String(date.getSeconds());
        if (day.length === 1) {
            day = '0' + day;
        }
        if (month.length === 1) {
            month = '0' + month;
        }
        if (hour.length === 1) {
            hour = '0' + hour;
        }
        if (minute.length === 1) {
            minute = '0' + minute;
        }
        if (second.length === 1) {
            second = '0' + second;
        }
        return day + '-' + month + '-' + year + ' ' + hour + ':' + minute + ':' + second;
    }

    public static makeUniqueString() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text + new Date().getTime();
    }

    public static randomNumberNotExits(min, max, listIndexFriend: Array<number>) {
        let number;
        do {
            min = Number(min);
            max = Number(max);
            let nr = Math.ceil(min + Math.random() * (max - min));
            let index = listIndexFriend.indexOf(nr);
            if (index === -1) {
                number = nr;
            }
        } while (!number);
        return number;
    }
}
