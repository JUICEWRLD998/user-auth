import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types';

const prisma = new PrismaClient();

export class AuthService {
    async createUser(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        return user;
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    generateToken(user: User): string {
        const payload = { id: user.id, email: user.email };
        return jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    }
}