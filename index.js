const express = require('express');
const app = express()
const port = process.env.port || 5000;

app.get('/', (req, res) => {
    res.send("Shop Sphere server is running ...")
})

app.listen(port, () => {
    console.log(`Shop Sphere server is running on port ${port}`)
})