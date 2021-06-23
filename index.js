const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config();
const cors =  require('cors');


const app = express();
app.use(cors());

const port = process.env.PORT;

dbConnection();

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

