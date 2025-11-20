import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to the database successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

export { connectToDatabase, prisma };