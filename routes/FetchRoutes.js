const { con, sequelize } = require('./db');

const getAnnotationFromImage = (item) => {
    return new Promise((resolve, reject) => {
        con.connection.query('SELECT * FROM annotations WHERE image_id = ?', item.id, (e, result, fields) => {
            item['annotations'] = result;
            // console.log(item);
            resolve(item);
        });
    });
}

async function imagesWithAnnotations(results) {
    let response = [];
    for (const item of results) {
        // console.log(item);
        await getAnnotationFromImage(item).then((each) => {
            response.push(each);
        });
    }
    console.log(response);
    return response;
}
// get All images
exports.imageLibrary = (req, res) => {
    console.log('got request');
    con.connection.query('SELECT * FROM images', (err, results, fields) => {
        imagesWithAnnotations(results).then((response) => {
            res.send(response);
        });
    });
}
