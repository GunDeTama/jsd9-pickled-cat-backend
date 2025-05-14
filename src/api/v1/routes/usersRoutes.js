import { Router } from 'express';
import {
  deleteProfileById,
  getProfileById,
  login,
  logout,
  register,
  updateProfileById,
} from '../controllers/usersController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users/logout', logout);

router.get('/users/profile/:userId', authMiddleware, getProfileById);
router.delete('/users/profile/:userId', authMiddleware, deleteProfileById);
router.patch('/users/profile/:userId', authMiddleware, updateProfileById);

export { router as usersRoutes };
