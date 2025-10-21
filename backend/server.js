import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habit.js';
import diaryRoutes from './routes/diary.js';
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:5173",
}));
app.use(express.json({ limit: '5mb' }));

connectDB();

app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth',authRoutes );
app.use('/api/habits', habitRoutes );
app.use('/api/diary', diaryRoutes );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));