import { Request, Response } from 'express';
import db from '../config/db';

export async function getInstruments(req: Request, res: Response) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM Instrument ORDER BY id_instrument',
    );
    res.json(rows);
  } catch (err) {
    throw err;
  }
}

export async function getInstrumentsByType(req: Request, res: Response) {
  try {
    const { type } = req.params;
    const [rows] = await db.execute(
      'SELECT * FROM Instrument AS i INNER JOIN Instrument_type AS it ON it. id_type = i.Instrument_type_id WHERE it.type_name =?',
      [type],
    );

    res.json(rows);
  } catch (err) {
    throw err;
  }
}
