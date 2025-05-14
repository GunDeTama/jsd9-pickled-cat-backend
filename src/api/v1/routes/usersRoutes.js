import { Router } from 'express';
import {
  deleteProfileById,
  getProfileById,
  login,
  logout,
  register,
  updateProfileById,
} from '../controllers/usersController.js';
import { isLogin } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users/logout', logout);

router.get('/users/profile', isLogin, getProfileById);
router.delete('/users/profile', isLogin, deleteProfileById);
router.patch('/users/profile', isLogin, updateProfileById);

export { router as usersRoutes };
