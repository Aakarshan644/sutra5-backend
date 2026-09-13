import express from 'express';
import cors from 'cors';
import onboardingRoutes from './api/onboarding/onboarding.routes';
import uploadsRoutes from './api/uploads/uploads.routes';
import authRoutes from './api/auth/auth.routes';
import slotsRoutes from './api/slots/slots.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sutra5-backend' });
});

app.use('/api/onboarding', onboardingRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Sutra5 backend running on http://localhost:${PORT}`);
});
