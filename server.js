const express = require('express');
const app = express();
const PORT = 8080;


const client = require('./db/client');
client.connect();

app.get('/', (req, res) => {
    res.send(`<h1>Hello World!</h1>`);
});

// Router: /api
//app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});