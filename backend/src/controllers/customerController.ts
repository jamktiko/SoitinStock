import { Request, Response } from 'express';
import db from '../config/db';

const customerController = {
  //find all customers
  async findAll(req: Request, res: Response) {
    try {
      const [rows] = await db.execute('SELECT * FROM Customer');

      res.json(rows);
    } catch (err) {
      throw err;
    }
  },
};

export default customerController;
