import express from 'express'
import {signup,login,logout,googleSignIn} from '../controllers/auth.controller.js'
import protectRoute from '../middlewares/protectedRoute.js'
const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post('/google', googleSignIn);
router.get('/check-auth', protectRoute, (req, res) => {
    // If protectRoute middleware allows the request to proceed, the user is authenticated
    res.status(200).json({ isAuthenticated: true, user: req.user });
  });


export default router;