import { register, login, emailConfirm, handleRefreshToken, logout } from '../controllers/authController' 

const express = require("express");

const router = express.Router();

router.post('/reg', register);
router.post('/login', login);
router.get('/verify/:token', emailConfirm);
router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)

export default router;