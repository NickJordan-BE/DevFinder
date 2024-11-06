import { validUwEmail, hashPassword, isVerified } from "../middlewares/authMiddlewares";
import { Request, Response } from "express";
import { UserModel, User, Password } from '../models/user'

require("dotenv").config();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mailUsername = process.env.MAILUSER;
const mailPassword = process.env.MAILPASSWORD;
const secretEmail = process.env.SECRETEMAIL;
const secret = process.env.SECRET;


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: mailUsername,
        pass: mailPassword
    },
}); 

export const register = async (req: Request, res: Response) => {
    const { username, email, password} = req.body;

    const verificationToken: string = jwt.sign({ username }, secretEmail, { expiresIn: "1h"});

    try {
        if (!validUwEmail(email)) {
            return res.status(501).send("Registration Failed. Invalid Email");
        }

        const verificationLink: string = `http://localhost:3000/verify/${verificationToken}`; 
        const hash: string = await hashPassword(password);

        const user: User = await UserModel.createUser(email, username, hash); 

        if (!user) {
            return res.status(501).json({
                status: "fail",
                message: "Failed to Register User"
            })
        }

        await transporter.sendMail({
            to: email,
            subject: "Email Verification",
            html: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`
        })
        
        res.status(201).json({
            username: username,
            message: "User Registered Successfully! Check Email for Verification Link."})
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
            message: "Registration Failed"});
    }
}

export const login = async (req: Request, res: Response) => {
    const identifier = req.body.identifier

    try {
    const user: User = await UserModel.findByEmailOrUsername(identifier)

    if (!user) {
        return res.status(402).json({
            success: false,
            message: "User Not Found"
        })
    }

    const password: Password = await UserModel.findPasswordByID(user.id);
    
    if (!(isVerified(user)) 
        || !(await bcrypt.compare(req.body.password, password.hash_password))) {

        return res.status(401).send('Invalid Username or Password');
    }

    const token: string = jwt.sign({ id: user.id, username: user.username},
                            secret, {expiresIn: '15min'});

    res.cookie('token', token, {
        httpOnly: true,
        signed: true,
        maxAge: 900000
    });
    
    res.status(201).json({message: "Login Successful"});
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export const emailConfirm = async (req: Request, res: Response) => {
    const token: string = req.params.token;

    try {
        const username = jwt.verify(token, secretEmail);

        const user: User = await UserModel.findByEmailOrUsername(username.username);

        if (!user) {
            res.status(400).send("User not found.")
        }

        await UserModel.verifyUser(user.id);


        res.status(201).send('User is now verified!')
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid or Expired token.');
    }
}