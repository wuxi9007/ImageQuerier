const con = require('./Connection');

// get All images
exports.imageLibrary = (req, res) => {
    console.log('got request');
    con.connection.query('SELECT * FROM images', (err, results, fields) => {
        res.send(results);
    });
}
