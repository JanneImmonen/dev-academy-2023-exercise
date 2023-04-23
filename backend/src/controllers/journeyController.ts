import { Pool } from 'pg';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError, InternalServerError } from '../customError';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

export const getJourneys = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const size = req.query.size ? parseInt(req.query.size as string) : 100;
    const offset = (page - 1) * size;
    const orderBy = req.query.orderBy || 'started_at';
    const orderDirection = req.query.orderDirection === 'desc' ? 'DESC' : 'ASC';

    const { rows } = await pool.query(`
      SELECT * FROM journeys
      ORDER BY ${orderBy} ${orderDirection}
      LIMIT $1 OFFSET $2
    `, [size, offset]);

    if (rows.length === 0) {
      throw new NotFoundError('No journeys found');
    }

    res.json(rows);
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(error);
    } else {
      next(new InternalServerError());
    }
  }
};
