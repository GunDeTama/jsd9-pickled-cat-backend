import { Router } from 'express';
import {
  deleteProfileById,
  getProfileById,
  login,
  logout,
  register,
  updateProfileById,
} from '../controllers/usersController.js';

const router = Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users/logout', logout);

// TODO: middleware: check if login
router.get('/users/profile/:userId', getProfileById);
router.delete('/users/profile/:userId', deleteProfileById);
router.patch('/users/profile/:userId', updateProfileById);

export { router as usersRoutes };
