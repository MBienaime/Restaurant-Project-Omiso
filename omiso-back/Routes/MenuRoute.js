const express = require('express'); 

const router = express.Router(); 


router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'GET request to /menu'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message : 'POST request to /menu'
    });
});

module.exports = router;