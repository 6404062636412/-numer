const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const responseData = {
        Equation: "(x^4) - 13",
        xl: 3,
        xr: 4,
    };
    res.json(responseData);
});

module.exports = router;
