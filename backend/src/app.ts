import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import journeyRouter from './routes/journey';
import stationRouter from './routes/station'; // Change this import

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/journeys', journeyRouter);
app.use('/stations', stationRouter);

export default app;
