import Router from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getAllMsg, addMsg } from '../controllers/messageController.js';

const router = Router();


router.post('/get-msg', authenticate, getAllMsg);
router.post('/add-msg', authenticate, addMsg);


export default router;