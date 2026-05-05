import { Request, Response } from 'express';
import db from '../config/db';

export async function getTypes(req: Request, res: Response) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM Instrument_type ORDER BY id_type',
    );
    res.json(rows);
  } catch (err) {
    throw err;
  }
}
