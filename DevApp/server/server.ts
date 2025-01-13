import { Express } from 'express'
import authRoutes from './routes/authRoutes'
import postRoutes from './routes/postRoutes'
import cookieParser from 'cookie-parser'

require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const corsOption = require("./config/corsOptions");

const app: Express = express();
// middleware for react
app.use(cors(corsOption));
//middleware for request bodys
app.use(bodyParser.json());
// middleware for cookies
app.use(cookieParser());

// api routes for user authentication and authorization
app.use("/api/auth", authRoutes);
// api routes for all post objects
app.use("/api/posts", postRoutes)

const port: string | Number = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

module.exports = app;