const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/libraryDB')
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err.reason)
    })
