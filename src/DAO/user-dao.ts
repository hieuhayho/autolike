import {SqlManager} from "../service/sql-manager";
import {User} from "../models/user";
import {Utils} from "../utils/utils";

export class UserDao {
    private static instance: UserDao;

    public static getInstance() {
        if (!UserDao.instance) {
            UserDao.instance = new UserDao();
        }
        return UserDao.instance;
    }

    private constructor() {

    }

    public async getUserByUserId(userId: string): Promise<User> {
        let listUser: Array<User> = await SqlManager.getInstance().select('select * from Users where userId = ' + userId);
        if (listUser && listUser.length > 0) {
            return listUser[0];
        }
        return undefined;
    }

    public async getAllUser() {  // get all user except onlyShowForFacebookSystem property set to true
        try {
            let listUser: Array<User> = await SqlManager.getInstance().select('select * from Users');
            if (listUser && listUser.length > 0) {
                return listUser;
            }
            return new Array<User>();
        } catch (e) {
            console.log(Utils.getError(e));
            return new Array<User>();
        }
    }

    public async insertUser(user: User): Promise<number> {
        let result = await SqlManager.getInstance().run(`INSERT INTO Users(userId, cookie, userAgent, accountName, location,
                                                                              birthday)
                                                         VALUES (?, ?, ?, ?, ?, ?)`,
            user.userId, user.cookie, user.userAgent, user.accountName, user.location, user.birthday);
        return new Promise<number>(resolve => {
            resolve(result.lastID);
        });
    }

    public async insertOrUpdateUserByuserId(user: User) {
        let tempUser = await this.getUserByUserId(user.userId);
        if (tempUser) {
            user.id = tempUser.id;
            await this.updateUser(user);
            return user.id;
        } else {
            user.id = await this.insertUser(user);
            return user.id;
        }
    }

    public async updateUser(newUser: User) {
        if (!newUser.userId) {
            return;
        }
        let dataReturn = await SqlManager.getInstance().run(`UPDATE Users
                                                             SET userId           = ?,
                                                                 cookie           = ?,
                                                                 userAgent        = ?,
                                                                 accountName      = ?,
                                                                 location         = ?,
                                                                 birthday         = ?,
                                                             WHERE id = ?`,
            newUser.userId, newUser.cookie, newUser.userAgent, newUser.accountName, newUser.location, newUser.id);
        return dataReturn;
    }

    public async deleteMultipleUser(listUserId) {
        let dataReturn = await SqlManager.getInstance().run(`DELETE FROM Users WHERE userId IN (` + listUserId + `)`);
        return dataReturn;
    }

    public async deleteUser(user: User) {
        try {
            let dataReturn = await SqlManager.getInstance().run(`DELETE from Users where id = ?`,
                user.id);
            return dataReturn;
        } catch (e) {
            console.log(e);
        }
    }
}
