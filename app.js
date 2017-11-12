const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req,res,next){
res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','authorization');
    next();
});
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/css', express.static(__dirname + '/node_modules/')); // redirect CSS bootstrap

app.post('/test',(req,res)=>{
   console.log(req);
});
// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
 
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '2000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));