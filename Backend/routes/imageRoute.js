import Router from 'express';
import { uploadMiddleware } from '../middlewares/multerMiddleware.js';
import { uploadImage } from '../controllers/imageController.js';


const router = Router();


router.post('/upload',uploadMiddleware,uploadImage);


export default router;