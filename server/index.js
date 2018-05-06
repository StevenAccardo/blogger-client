const express = require('express');
const http = require('http');

const app = express();

app.use(express.static('dist'));
//If a get requests comes in for any route on our server, send back the index.html file.
//This is used specifically for/with react router's browserhistory module
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log('Listening'));
