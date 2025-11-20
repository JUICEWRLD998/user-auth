import express from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;