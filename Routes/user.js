import express from 'express'
import { login, register } from '../Controllers/user.js';

const router = express.Router();

//register route
router.post("/register" ,register);     //@api  = api/user/register
router.post("/login" ,login);     //@api  = api/user/login

export default router;
