const express = require('express');
const cors = require('cors');

const APIBisection = require('./API ROOT/APIBisection');
const APIFalsePosition = require('./API ROOT/APIFalsePosition');
const APICramerrule = require('./API LINER/APICramerrule');
const APIOnePoint = require('./API ROOT/APIOnePoint')

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.use('/API-ROOT', APIBisection);
app.use('/API-ROOT1', APIFalsePosition);
app.use('/API-LINER', APICramerrule);
app.use('/API-ROOT2', APIOnePoint)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});