const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name',
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database');
});

// Handle GET requests
app.get('/api/records/:name', (req, res) => {
    const name = req.params.name;

    // Query the database for a record with a matching name field using parameterized query
    const query = 'SELECT * FROM records WHERE name = ?';
    const values = [name];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error querying the database: ', err);
            res.status(500).send('Error querying the database');
            return;
        }

        // Send the result back to the frontend
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
