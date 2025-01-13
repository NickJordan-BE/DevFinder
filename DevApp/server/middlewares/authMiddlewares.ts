import { User } from "../models/user";

require("dotenv").config()
const bcrypt = require('bcrypt');

export function hashPassword(plainPassword: any) {
    const salt = bcrypt.genSaltSync();

    return bcrypt.hash(plainPassword, salt)
    .then((hash: string) => {
        return hash;
    })
    .catch((err: Error) => {
        console.log(err);
    })
}

export function validUwEmail(email: any) {
    return email.substring(email.lastIndexOf('@')) === '@uw.edu';
}

export function isVerified (user: User) {
    return user.is_verified === true;
}


