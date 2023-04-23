// backend/src/routes/station.ts
import express from 'express';
import { getStations, getStation } from '../controllers/stationController'; // Updated import

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stations = await getStations(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const station = await getStation(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch station' });
  }
});

export default router;
