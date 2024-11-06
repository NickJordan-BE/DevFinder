import { Request, Response, NextFunction } from "express";

require("dotenv").config()
const bcrypt = require('bcrypt');
const cookies = require('next-cookies');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

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

export function isVerified (user: any) {
    return user.is_verified === true;
}


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token : string = req.signedCookies.token;

    if (!token) {
        res.status(501).json({ message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, SECRET)
        req.body.user = decoded
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token"})
    }
}