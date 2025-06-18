import { Router } from "express";
import { registerUser, loginUser,logOutUser,getAllUsers,setAvatar } from "../controllers/userController.js";

const router= Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get('/logout/:id',logOutUser);
router.get("/get/:id",getAllUsers);
router.post('/setAvatar/:id',setAvatar);


export default router;