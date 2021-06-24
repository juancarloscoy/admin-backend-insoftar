const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

const port = process.env.PORT;

dbConnection();

app.use('/api/usuarios', require('./routes/usuarios'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

