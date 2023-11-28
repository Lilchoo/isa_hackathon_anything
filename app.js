// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'your-mysql-host', // Replace with your MySQL host
  user: 'your-mysql-username', // Replace with your MySQL username
  password: '*PaH#cZe3em7', // Replace with your MySQL password
  database: 'your-mysql-database', // Replace with your MySQL database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cors middleware to allow all origins
app.use(cors());

// Serve the HTML file
app.use(express.static('frontend'));

// Handle GET requests for displaying data by name
app.get('/result', (req, res) => {
  const { name } = req.query;

  // Retrieve the row from the table based on the name
  const query = 'SELECT * FROM data WHERE name = ?';
  db.query(query, [name], (err, results) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      res.json(results[0]); // Assuming you only want to return the first result
    } else {
      res.status(404).send('Data not found');
    }
  });
});

// Handle POST requests for inserting data
app.post('/submit', (req, res) => {
  const { name, data } = req.body;

  // Insert a row into the table
  const query = 'INSERT INTO data (name, data) VALUES (?, ?)';
  db.query(query, [name, data], (err, results) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }

    const insertedId = results.insertId;
    res.redirect(`/result?name=${name}`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
