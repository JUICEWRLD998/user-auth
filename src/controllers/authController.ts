import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // POST /auth/register
    public registerUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { username, email, password } = req.body;
            
            // Validate input
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Username, email, and password are required' });
            }
            
            const result = await this.authService.createUser(req.body);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    };

    // POST /auth/login
    public loginUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            
            // Validate input
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            
            const result = await this.authService.validateUser(req.body);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    };

    // GET /auth/me (protected route)
    public getMe = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await this.authService.getUserById(req.user.id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    };
}