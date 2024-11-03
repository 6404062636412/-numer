const express = require('express');
const cors = require('cors');

const app = express();
const port = 7777;

app.use(cors());
app.use(express.json());

// เส้นทาง
app.get('/', (req, res) => {
    const dataPoints = [
        { x1: 0, x2: 0, y: 1 },
        { x1: 0, x2: 1, y: 4 },
        { x1: 1, x2: 0, y: 3 },
        { x1: 1, x2: 2, y: 9 },
        { x1: 2, x2: 1, y: 8 },
        { x1: 2, x2: 2, y: 11 }
    ];

    res.json({ dataPoints });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
