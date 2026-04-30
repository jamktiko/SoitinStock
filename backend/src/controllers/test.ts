import { Request, Response } from 'express';
import db from '../config/db';

export async function testQuery(req: Request, res: Response) {
  try {
    const [rows] = await db.query('SELECT 1+1 AS result');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
