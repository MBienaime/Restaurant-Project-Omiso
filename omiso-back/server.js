const https = require('https');
const app = require('./app');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./Config/Certificates/Keyomiso.key'),
    cert: fs.readFileSync('./Config/Certificates/omiso.crt')
  };


const server = https.createServer(options,app);

server.listen(443, console.log('Server listen port: 433'));