import express from 'express'
import {signup,login,logout,googleSignIn} from '../controllers/auth.controller.js'
const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post('/google', googleSignIn);


export default router;