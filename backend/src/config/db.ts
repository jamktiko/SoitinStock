// here we make connection to the mysql database inside rds.
/*
what is needed:
- Host --> RDS endpoint URL
- Username --> database Username
- password --> the database password
- database name --> the name of the database

These will go to the .env file and will be read from there
*/

import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  const connection = await db.getConnection();
  console.log('✅ Database connected successfully');
  connection.release();
}

// const db = mysql.createPool({
//   host: 'localhost',
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.MYSLI_PASSWORD,
//   database: process.env.MYSLI_DB,
// });

// async function testConnection() {
//   const connection = await db.getConnection();
//   console.log('✅ Database connected successfully');
//   connection.release();
// }

testConnection();

export default db;
