const mongoose = require('mongoose');

const initDb = (callback) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    const db = mongoose.connection;

    db.on('error', (err) => {
        callback(err);
    });

    db.once('open', () => {
        callback();
    });
};

module.exports = {
    initDb
};