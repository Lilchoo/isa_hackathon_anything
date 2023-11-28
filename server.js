const http = require('http');
const mysql = require('mysql2');
const url = require('url');

const dbConfig = {
    // host: 'sql.freedb.tech',
    // user: 'freedb_freedb_krisadmin',
    // password: process.env.DB_PASSWORD,
    // database: 'freedb_lab5db',
    // port: 3306
};

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.name;
    console.log("NAME: ", name);

    if (req.method === 'GET') {

        console.log("GET method is called");


    } else {

        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end('Invalid method or endpoint.');

    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
