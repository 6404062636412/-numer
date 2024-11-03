const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080; // เปลี่ยนจาก 6000 เป็น 3000 หรือพอร์ตอื่นที่ปลอดภัย

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const apicublic = {
        points: [
            { "x": 3.0, "y": 2.5 },
            { "x": 4.5, "y": 1.0 },
            { "x": 7.0, "y": 2.5 },
            { "x": 9.0, "y": 0.5 }
        ],
        inputX: 5,
        numPoints: 4
    };
    res.json(apicublic);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
