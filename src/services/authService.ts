import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterRequest, LoginRequest } from '../types';

const prisma = new PrismaClient();

export class AuthService {
    // Register new user
    async createUser(data: RegisterRequest) {
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { username: data.username }
                ]
            }
        });

        if (existingUser) {
            throw new Error('User with this email or username already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        // Create user
        const user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
            },
        });
        
        // Generate token
        const token = this.generateToken(user);
        
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    // Login user
    async validateUser(data: LoginRequest) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        
        if (!user) {
            throw new Error('Invalid email or password');
        }
        
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        
        // Generate token
        const token = this.generateToken(user);
        
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    // Get user by ID (for protected route)
    async getUserById(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                // Don't return password
            }
        });
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    }

    // Generate JWT token
    generateToken(user: any): string {
        const payload = { id: user.id, email: user.email };
        return jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    }
}