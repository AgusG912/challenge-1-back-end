import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'

config();

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', productsRoutes);
app.use('/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}.`)
})