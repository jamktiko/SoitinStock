/* untested */

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// --------------------------------------------------
// CONFIG
// --------------------------------------------------
const port = process.env.PORT || 8080;

// CloudFront makes CORS mostly unnecessary, but keep for safety
app.use(cors());
app.use(express.json());

// --------------------------------------------------
// ROOT (used by EB health / direct access)
// --------------------------------------------------
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// --------------------------------------------------
// SIMPLE TEST (your working version)
// --------------------------------------------------
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from Backend!' });
});

// --------------------------------------------------
// DB CONNECTION HELPER (avoid repetition)
// --------------------------------------------------
async function getConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DB_NAME,
        port: process.env.RDS_PORT,
    });
}

// --------------------------------------------------
// DB READ test
// --------------------------------------------------
app.get('/api/db-test', async (req, res) => {
    try {
        const connection = await getConnection();

        const [rows] = await connection.execute('SELECT 1 as test');

        await connection.end();

        res.json({
            success: true,
            result: rows,
        });
    } catch (err) {
        console.error('DB TEST ERROR:', err);
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// DB WRITE + READ test
// --------------------------------------------------
app.get('/api/db-write-test', async (req, res) => {
    try {
        const connection = await getConnection();

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS test_table (
                id INT AUTO_INCREMENT PRIMARY KEY,
                message VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(
            `INSERT INTO test_table (message) VALUES (?)`,
            ['Hello from EB test'],
        );

        const [rows] = await connection.execute(
            `SELECT * FROM test_table ORDER BY id DESC LIMIT 5`,
        );

        await connection.end();

        res.json({
            success: true,
            inserted: true,
            data: rows,
        });
    } catch (err) {
        console.error('DB WRITE ERROR:', err);
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// HEALTH CHECK (can be used by EB / monitoring)
// --------------------------------------------------
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'backend',
        time: new Date().toISOString(),
    });
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
