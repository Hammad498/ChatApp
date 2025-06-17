import { Router } from "express";
import { registerUser, loginUser,logOutUser } from "../controllers/userController.js";

const router= Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post('/logout',logOutUser);


export default router;