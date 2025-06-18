import Router from 'express';
import { getAllMsg, addMsg } from '../controllers/messageController.js';

const router = Router();


router.post('/get-msg',  getAllMsg);
router.post('/add-msg',  addMsg);


export default router;