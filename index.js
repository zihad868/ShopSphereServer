const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.port || 5000;


//ShopSphere
//ZnQw7cdQrPSsaAKA

// Connect MongoBD
const connectMongoDB = require('./Models/db');
connectMongoDB()

app.get('/', (req, res) => {
    res.send("Shop Sphere server is running ...")
})

app.get('/test', (req, res) => {
    res.send("testing Purpose")
})

app.listen(port, () => {
    console.log(`Shop Sphere server is running on port ${port}`)
})