import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import creditRoutes from './routes/creditRoutes';
import prescriptionRoutes from './routes/prescriptionRoutes';

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PharmaFlow Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 PharmaFlow Backend khdam f port ${PORT}`);
});
