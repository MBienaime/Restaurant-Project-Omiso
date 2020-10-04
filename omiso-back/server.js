// imports
const https = require('https');
const fs = require('fs');
const app = require('./app');


// Certificates
const options = {
  key: fs.readFileSync('./Config/Certificates/Keyomiso.key'),
  cert: fs.readFileSync('./Config/Certificates/omiso.crt'),
};

// Server listener
const server = https.createServer(options, app);
server.listen(443, console.log('Server listen port: 443'));
