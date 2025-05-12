import { Router } from 'express';
import { createUser } from '../controllers/userController.js';

const router = Router();

router.post('/users', createUser);

export default router;
