import {Injectable} from "@angular/core";
import * as sqlite from 'sqlite3';
import {Constant} from "../utils/Constant";

@Injectable({
    providedIn: "root"
})
export class SqlManager {
    private static instance: SqlManager;
    private db: sqlite.Database;

    public static getInstance() {
        if (!SqlManager.instance) {
            SqlManager.instance = new SqlManager();
        }
        return SqlManager.instance;
    }

    private constructor() {
        const sqlite3 = (<any>window).require('sqlite3').verbose();
        let pathFolder = Constant.userAppDataPath;
        let pathDB = pathFolder + '/db.db';
        this.db = new sqlite3.Database(pathDB, () => {
        });
        console.log(pathDB);
        this.db = new sqlite3.Database(pathDB, () => {
        });
        this.db.serialize(async () => {
            try {
                let result = await this.run(`CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER NOT NULL,
                    userId varchar(255) ,
                    cookie text,
                    userAgent varchar(255),
                    accountName varchar(255) ,
                    location varchar(255) ,
                    birthday varchar(255) ,
                    CONSTRAINT Profiles_pk PRIMARY KEY (id)
                );`);
                console.log(result);
            } catch (er) {
                console.log(er);
            }
        });
    }


    public run(sql: string, ...params: any[]): Promise<sqlite.RunResult> {
        return new Promise<sqlite.RunResult>((resolve, reject) => {
            this.db.run(sql, params, function (err: Error) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this);
                }
            });
        });
    }

    public select(sql, ...params: any[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.db.all(sql, params, function (err: Error, rows: any[]) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
