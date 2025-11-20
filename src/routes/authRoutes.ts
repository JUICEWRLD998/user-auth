import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import authGuard from '../middleware/authGuard';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Protected route (requires authentication)
router.get('/me', authGuard, authController.getMe);

export default router;