import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const authGuard = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from Authorization header (format: "Bearer <token>")
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Attach user info to request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
};

export default authGuard;