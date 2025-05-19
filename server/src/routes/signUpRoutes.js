import { signIn,about,login, verifyEmail, checkToken } from "../controllers/signUpController.js";
import express from 'express';
const router=express.Router();

router.post("/signIn",signIn);
router.post("/login",login);
router.get("/verify-email",verifyEmail);
router.get("/about",about);
router.get('/checkToken',checkToken);

export default router;

