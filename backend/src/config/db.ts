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

const requiredEnv = [
  'RDS_HOST',
  'RDS_USERNAME',
  'RDS_PASSWORD',
  'RDS_DB_NAME',
  'RDS_PORT',
];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnv.join(', ')}`,
  );
}

// -------------------------------
// This needs to be uncommentend
// FOR PRODUCTION
//--------------------------------

const db = mysql.createPool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: Number(process.env.RDS_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  const connection = await db.getConnection();
  console.log('✅ Database connected successfully');
  connection.release();
}

// -------------------------------
// This needs to be uncommentend
// FOR PRODUCTION
//--------------------------------

// ---------------------------------

// -------------------------------
// This needs to be commentend
//--------------------------------

//Local database configuration for development:
// const db = mysql.createPool({
//   host: 'localhost',
//   port: Number(process.env.RDS_PORT),
//   user: process.env.RDS_USERNAME,
//   password: process.env.MYSLI_PASSWORD,
//   database: process.env.MYSLI_DB,
// });

// async function testConnection() {
//   const connection = await db.getConnection();
//   console.log('✅ Local database connected successfully');
//   connection.release();
// }

// if (!process.env.RDS_HOST) {
//   throw new Error('RDS_HOST is not defined in environment variables');
// }

// -------------------------------
// This needs to be commentend
//--------------------------------

testConnection();

export default db;
