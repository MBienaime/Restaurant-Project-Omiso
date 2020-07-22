//import
const https = require('https');
const app = require('./app');
const fs = require('fs');


// Certificates
const options = {
    key: fs.readFileSync('./Config/Certificates/Keyomiso.key'),
    cert: fs.readFileSync('./Config/Certificates/omiso.crt')
  };


//Server listen
const server = https.createServer(options,app);
server.listen(443, console.log('Server listen port: 443'));