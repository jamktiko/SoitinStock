import { Request, Response } from 'express';
import db from '../config/db';

export async function getInstruments(req: Request, res: Response) {
  const [rows] = await db.execute('SELECT * FROM Instrument');
  res.json(rows);
}
