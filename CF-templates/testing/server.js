const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

// Root test
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// DB test route
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

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'backend',
        time: new Date().toISOString(),
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
