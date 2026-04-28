const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

// --------------------------------------------------
// Root test
// --------------------------------------------------
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// --------------------------------------------------
// DB READ test route (existing)
// --------------------------------------------------
app.get('/db-test', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.RDS_HOST,
            user: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
            port: process.env.RDS_PORT,
        });

        const [rows] = await connection.execute('SELECT 1 as test');
        await connection.end();

        res.json({ success: true, result: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// DB WRITE + READ test route (NEW)
// --------------------------------------------------
app.get('/db-write-test', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.RDS_HOST,
            user: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
            port: process.env.RDS_PORT,
        });

        // Create test table if it doesn't exist
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS test_table (
                id INT AUTO_INCREMENT PRIMARY KEY,
                message VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert test row
        await connection.execute(
            `INSERT INTO test_table (message) VALUES (?)`,
            ['Hello from EB test'],
        );

        // Read latest rows
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
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// Health check
// --------------------------------------------------
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'backend',
        time: new Date().toISOString(),
    });
});

// --------------------------------------------------
// Start server
// --------------------------------------------------
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/* TOIMIVA SERVER.JS koodi on tässä säilöttynä!!!

const express = require('express');
const cors = require('cors');
const app = express();

const port = parseInt(process.env.PORT || '3000', 10);

// You can actually REMOVE this later when using CloudFront
app.use(cors());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from Backend!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


*/
