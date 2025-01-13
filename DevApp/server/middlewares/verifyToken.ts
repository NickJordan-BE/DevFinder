import { Request, Response, NextFunction } from "express";

require("dotenv").config()
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET) 
        req.body.user = decoded.id
        next()
    } catch {
        res.sendStatus(403)
    }
}