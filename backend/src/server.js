import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


//middlewares
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
// app.use(rateLimiter);


//routes
app.use('/api/notes/', notesRoutes);

connectDB().then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('the server running on http://localhost:' + PORT);
    });
}).catch((error) => {
    console.error('Failed to connect to the database', error);
});