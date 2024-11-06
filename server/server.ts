import { Express } from 'express'
import authRoutes from './routes/authRoutes'
import postRoutes from './routes/postRoutes'
import cookieParser from 'cookie-parser'

require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIESECRET));

/**
 * POST API for user registration that uses a router imported from authorization routes
 */
app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes)

const port: string | Number = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

module.exports = app;