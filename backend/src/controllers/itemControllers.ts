import { Request, Response } from 'express';
import db from '../config/db';

export async function getItems(req: Request, res: Response) {
  try {
    const [rows] = await db.execute('SELECT * FROM Item ORDER BY barcode');
    res.json(rows);
  } catch (err) {
    throw err;
  }
}

export async function getItemsByInstrumentName(req: Request, res: Response) {
  try {
    const { instrumentName } = req.params;
    const [rows] = await db.execute(
      'SELECT * FROM Item AS i INNER JOIN Instrument AS ins ON ins.id_Instrument = i.Instrument_id_Instrument WHERE ins.name =?',
      [instrumentName],
    );
    res.json(rows);
  } catch (err) {
    throw err;
  }
}
