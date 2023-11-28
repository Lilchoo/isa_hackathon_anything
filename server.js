const http = require('http');
const url = require('url');
const mysql = require('mysql')

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
    user: 'sql3665883',
    password: process.env.DB_PASSWORD,
    database: 'sql3665883',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
});

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET' && req.url === '/search-user') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username } = JSON.parse(body);
            const query = 'SELECT * FROM user WHERE username = ?';

            connection.query(query, [username], (err, results) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Error executing query', err }));
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Query successful', results }));
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});