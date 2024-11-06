import { QueryResult } from "pg";

const db = require('../config/db')

export interface User {
    id: number;
    username: string,
    email: string,
    isVerified: boolean
}

export interface Password {
    id: number,
    hash_password: string
}
 
export const UserModel = {
    findByEmailOrUsername: async (identifier: string) => {
        const res: QueryResult = await db.query
                    ('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier])

        return res.rows[0];
    },

    createUser: async (email: string, username: string, password: string) => {
        try {
        await db.query("BEGIN");

        const userQuery = "INSERT INTO users (username, email) VALUES ($1, $2)";
        const userQueryArgs = [username, email];
        const resUser = await db.query(userQuery, userQueryArgs)

        const passQuery = "INSERT INTO passwords (hash_password) VALUES ($1)";
        const passQueryArgs = [password];

        await db.query(passQuery, passQueryArgs);

        await db.query("COMMIT");

        return resUser;
        } catch (err: any){
            await db.query("ROLLBACK");
            console.log(err);
        }
    },

    findPasswordByID: async (id: number) => {
        const password: QueryResult = await db.query
        ('SELECT * FROM passwords WHERE id = $1', [id])

        return password.rows[0];
    },

    verifyUser: async (id: number) => {
        const result: QueryResult = await db.query("UPDATE users SET is_verified = TRUE WHERE id = $1", [id]);

        return result;
    }
}