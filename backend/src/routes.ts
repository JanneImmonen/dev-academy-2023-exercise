// src/routes.ts
import express from 'express';
import journeyRoutes from './routes/journey';
import stationRoutes from './routes/station';

const router = express.Router();

router.use('/journeys', journeyRoutes);
router.use('/stations', stationRoutes);

export default router;
