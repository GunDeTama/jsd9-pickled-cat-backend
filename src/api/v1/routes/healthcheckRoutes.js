import { Router } from 'express';
import {
  errorHandlingCheckController,
  healthcheckController,
} from '../controllers/healthcheckController.js';

const router = Router();

router.get('/', healthcheckController);
router.get('/', errorHandlingCheckController);

export { router as healthcheckRoutes };
