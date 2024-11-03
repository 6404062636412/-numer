const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    const responseData ={
        Equation:"x-2",
        X0: 5
    };
    res.json(responseData);
});


module.exports = router;