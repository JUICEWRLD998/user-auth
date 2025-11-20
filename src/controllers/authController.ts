import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async registerUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.authService.createUser(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async loginUser(req: Request, res: Response): Promise<Response> {
        try {
            const token = await this.authService.validateUser(req.body);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.authService.getUserById(req.user.id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}