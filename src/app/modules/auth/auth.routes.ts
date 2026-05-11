import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.'
  }
});

router.post('/register', authRateLimiter, validateRequest(AuthValidation.register), AuthController.register);
router.post('/login', authRateLimiter, validateRequest(AuthValidation.login), AuthController.login);

export const AuthRoutes = router;
