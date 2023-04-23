import * as fs from 'fs';
import * as path from 'path';
import csvParser = require('csv-parser');
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
    connectionString,
});

async function importStations(stations: any[]) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const station of stations) {
            await client.query(
                'INSERT INTO stations (id, name, address, lat, lon) VALUES ($1, $2, $3, $4, $5)',
                [station.id, station.name, station.address, station.lat, station.lon]
            );
        }

        await client.query('COMMIT');
    } catch (error) {
        console.error('Error importing stations:', error);
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
}

async function importJourneys(journeys: any[]) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const journey of journeys) {
            const durationInSeconds = parseInt(journey.duration, 10) / 1000;
            const distanceInMeters = parseFloat(journey.distance);

            if (durationInSeconds >= 10 && distanceInMeters >= 10) {
                await client.query(
                    'INSERT INTO journeys (departure_station_id, return_station_id, distance, duration, started_at, ended_at) VALUES ($1, $2, $3, $4, $5, $6)',
                    [
                        journey.departure_station_id,
                        journey.return_station_id,
                        journey.distance,
                        journey.duration,
                        journey.started_at,
                        journey.ended_at,
                    ]
                );
            }
        }

        await client.query('COMMIT');
    } catch (error) {
        console.error('Error importing journeys:', error);
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
}

function parseCsvFile(filepath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
      const data: any[] = [];

      fs.createReadStream(filepath)
          .pipe(csvParser())
          .on('data', (row) => {
              // Map the correct columns from the CSV file
              data.push({
                  id: row.ID,
                  name: row.Name,
                  address: row.Osoite,
                  lat: parseFloat(row.y),
                  lon: parseFloat(row.x),
              });
          })
          .on('end', () => resolve(data))
          .on('error', (error) => reject(error));
  });
}

(async () => {
    try {
        const stationDataFile = path.join(__dirname, '..', 'data', 'stations.csv');
        const stationDataPromise = parseCsvFile(stationDataFile);

        const journeyDataFiles = [
            path.join(__dirname, '..', 'data', '2021-05.csv'),
            path.join(__dirname, '..', 'data', '2021-06.csv'),
            path.join(__dirname, '..', 'data', '2021-07.csv'),
        ];

        const journeyDataPromises = journeyDataFiles.map(parseCsvFile);

        const stationData = await stationDataPromise;
        await importStations(stationData);

        const journeyData = (await Promise.all(journeyDataPromises)).flat();
        await importJourneys(journeyData);

        console.log('Data import complete');
    } catch (error) {
        console.error('Error during data import:', error);
    } finally {
        pool.end();
    }
})();