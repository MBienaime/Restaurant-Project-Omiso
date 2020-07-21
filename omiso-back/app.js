const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/public'));

app.use((req, res, next)=> {
    res.status(200).json({
        message: 'Currently running'
    });
});

module.exports = app; 