// src/controllers/stationController.ts
import { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

export async function getStation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM stations WHERE id = $1', [id]);

    if (rows.length === 0) {
      res.status(404).send('Station not found');
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(`Error fetching station with id ${req.params.id}:`, error);
    res.status(500).send('Error fetching station');
  }
}

// Add the getStations function
export async function getStations(req: Request, res: Response) {
  try {
    const nameSearch = req.query.name || '';
    const { rows } = await pool.query(`
      SELECT * FROM stations
      WHERE name ILIKE '%' || $1 || '%'
    `, [nameSearch]);

    res.json(rows);
  } catch (error) {
    console.error(`Error fetching stations:`, error);
    res.status(500).send('Error fetching stations');
  }
}
