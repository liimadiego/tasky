import express from 'express';
const app = express();
import routes from './routes/routes.js';
import authenticationRoutes from './routes/authentication.routes.js';
import taskRoutes from './routes/task.routes.js';
import cors from 'cors';
import dotenv from 'dotenv-safe';

dotenv.config({
    allowEmptyValues: true
});

app.use(cors({
    origin: process.env.FRONT_APPLICATION_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/', routes);
app.use('/tasks', taskRoutes);
app.use('/auth', authenticationRoutes);

export default app;