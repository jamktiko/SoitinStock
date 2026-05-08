import { Request, Response } from 'express';
import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const rentalController = {
  //find all rentals
  async findAll(req: Request, res: Response) {
    try {
      const [rows] = await db.execute('SELECT * FROM Rentals');

      res.json(rows);
    } catch (err) {
      throw err;
    }
  },

  //find all rentals for customer by email

  async findByEmail(req: Request, res: Response) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM Rentals AS r INNER JOIN Customer AS c ON c.id_customer=r.customer_id WHERE c.email =?',
        [req.params.email],
      );

      res.json(rows);
    } catch (err) {
      throw err;
    }
  },

  //Insert new Rental

  async createRental(req: Request, res: Response) {
    const connection = await db.getConnection(); //get single connection from pool

    try {
      //Start Transaction. We want transaction because we are inserting into multiple tables and if one query fails ALL fail.

      await connection.beginTransaction();

      //1. check if the items are available, store the id if it is
      // if it isn't , stop the transaction

      const placeholders = req.body.items.map(() => '?').join(', ');

      const [item_rows] = await connection.execute<RowDataPacket[]>(
        `SELECT id_item, is_available, barcode FROM Item WHERE barcode IN (${placeholders})`,
        req.body.items,
      );

      if (item_rows.length !== req.body.items.length) {
        throw new Error('One or more barcodes not found');
      }

      const unavailable = item_rows.filter((row) => row.is_available === 0);

      if (unavailable.length > 0) {
        const barcodes = unavailable.map((row) => row.barcode).join(', ');
        throw new Error(`Items not available: ${barcodes}`);
      }
      const items: number[] = item_rows.map((row) => row.id_item);

      //2. Check if customer is already in database

      let customer_id: number;

      const [customer_rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM Customer WHERE email = ?',
        [req.body.email],
      );
      //if customer is already existing, use the id
      //if the customer isn't in the database, create new customer and take the id
      if (customer_rows.length === 0) {
        const [customer] = await connection.execute<ResultSetHeader>(
          'INSERT INTO Customer (email, firstname, lastname, phone) VALUES (?,?,?,?)',
          [
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            req.body.phone,
          ],
        );

        console.log(`Added new customer with id ${customer.insertId}`);
        customer_id = customer.insertId;
      } else {
        customer_id = customer_rows[0].id_customer;
        console.log('Found the customer with id', customer_id);
      }

      //3. add Rentals row, store the id

      const employee_id = (req as any).user.sub; //comes fro authMiddleware
      const start_date = new Date();

      const [rental_rows] = await connection.execute<ResultSetHeader>(
        'INSERT INTO Rentals (start_date, end_date, employee, rent_status, customer_id, total_price) VALUES (?,?, ?, "active", ?, ?)',
        [
          start_date,
          req.body.end_date,
          employee_id,
          customer_id,
          req.body.total_price,
        ],
      );

      const rent_id = rental_rows.insertId;

      // 4. Add to Rentals_has_Item and change the items availablity to 0 = false

      for (const item_id of items) {
        await connection.execute(
          'INSERT INTO Rentals_has_Item (Rentals_id, Item_id) VALUES (?, ?)',
          [rent_id, item_id],
        );
        await connection.execute(
          'UPDATE Item SET is_available = 0 WHERE id_item = ?',
          [item_id],
        );
      }

      await connection.commit();
      res.status(201).json({ message: 'Rental created successfully' });
    } catch (err: any) {
      await connection.rollback();
      res.status(400).json({ message: 'Rental failed', error: err.message });
    } finally {
      connection.release(); // always return connection back to pool
    }
  },
};

export default rentalController;
