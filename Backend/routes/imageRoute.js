import Router from 'express';
import { uploadMiddleware } from '../middlewares/multerMiddleware.js';
import {uploadImage}  from '../controllers/imageUploadController.js'
import { authenticate } from '../middlewares/authenticate.js';


const router = Router();


router.post('/upload',authenticate,uploadMiddleware,uploadImage);


export default router;