import express from 'express';
import bodyParser from 'body-parser';
import profileRoutes from './routes/profileRoutes';
import contractRoutes from './routes/contractRoutes';
import jobRoutes from './routes/jobRoutes';
import balanceRoutes from './routes/balanceRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/profiles', profileRoutes);
app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);
app.use('/balances', balanceRoutes);
app.use('/admin', adminRoutes);

export default app;
