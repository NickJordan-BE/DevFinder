import { register, login, emailConfirm } from '../controllers/authController' 

const express = require("express");

const router = express.Router();

router.post('/reg', register);
router.post('/login', login);
router.get('/verify/:token', emailConfirm);

export default router;