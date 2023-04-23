// backend/src/routes/journey.ts
import express from 'express';
import { getJourneys } from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stationId = req.query.stationId as string;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const size = req.query.size ? parseInt(req.query.size as string, 10) : undefined;
    const journeys = await getJourneys(stationId, page, size);
    res.json(journeys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch journeys' });
  }
});

export default router;
