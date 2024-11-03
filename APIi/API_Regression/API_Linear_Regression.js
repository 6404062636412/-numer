const express = require('express');
const cors = require('cors');

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());

// เส้นทาง
app.get('/', (req, res) => {
    const points = [
        { x: 10, y: 2.2 },
        { x: 15, y: 4.6 },
        { x: 20, y: 4.2 },
        { x: 25, y: 7.0 },
        { x: 30, y: 6.6 },
        { x: 35, y: 9.2 }
    ];

    res.json({ points });
});

app.listen(port, () => {
    console.log(`run on http://localhost:${port}`);
});
