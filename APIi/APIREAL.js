const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // นำเข้า ObjectId

const app = express();
const port = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // เพื่อให้สามารถ parse JSON request body ได้

// URL เชื่อมต่อกับ MongoDB
const uri = 'mongodb://mongo:27017/NUMERR'; // ใช้ชื่อบริการ "mongo" จาก docker-compose.yml

// เชื่อมต่อกับ MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');

    const database = client.db('NUMERR');
    const collection = database.collection('DATA');

    // POST data to collection
    app.post('/postdata', async (req, res) => {
      const newData = {
        Equation: req.body.Equation,
        xl: req.body.xl,
        xr: req.body.xr,
      };
    
      try {
        const result = await collection.insertOne(newData);
        res.status(201).json({ ...newData, _id: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // GET data by ID
    app.get('/getdata/:id', async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId format' });
      }

      try {
        const data = await collection.findOne({ _id: new ObjectId(id) });
        if (data) {
          res.json(data);
        } else {
          res.status(404).json({ error: 'Data not found' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // GET all data
    app.get('/getdata', async (req, res) => {
      try {
        const data = await collection.find().toArray();
        res.json(data);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // เริ่มเซิร์ฟเวอร์
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
  }
}

run().catch(console.error);
