const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const responseData = {
        rows: 3,
        cols: 3,
        matrixA: [
            [2, -1, 0],
            [-1, 2, -1],
            [0, -1, 2]
        ],
        matrixB: [1, 0, 1]        
    };
    res.json(responseData);
});

module.exports = router;
