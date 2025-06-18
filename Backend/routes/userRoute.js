import { Router } from "express";
import { registerUser, loginUser,logOutUser,getAllUsers,setAvatar } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";
import {uploadMiddleware} from "../middlewares/multerMiddleware.js";

const router= Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get('/logout/:id',logOutUser);
router.get("/get/:id",getAllUsers);
router.put('/setAvatar/:id',authenticate,uploadMiddleware,setAvatar);


export default router;