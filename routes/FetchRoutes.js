const Annotation = require('../models').Annotation;
const Image = require('../models').Image;

// Find all annotations for image
const getAnnotationFromImage = (image) => {
    return new Promise((resolve, reject) => {
        Annotation.findAll({
            where: {
                imageId: image.id
            }
        }).then(annotations => {
            image['annotations'] = annotations;
            resolve(image);
        }); 
        // con.connection.query('SELECT * FROM annotations WHERE imageId = ?', image.id, (e, result, fields) => {
        //     image['annotations'] = result;
        //     // console.log(item);
        //     resolve(image);
        // });
    });
}

async function imagesWithAnnotations(results) {
    let response = [];
    for (const image of results) {
        await getAnnotationFromImage(image).then((each) => {
            response.push(each);
        });
    }
    // console.log(response);
    return response;
}
// get All images
exports.imageLibrary = (req, res) => {
    console.log('got request');
    Image.findAll({
        raw: true
    }).then(images => {
        imagesWithAnnotations(images).then((response) => {
            res.send(response);
        });
    });
    // con.connection.query('SELECT * FROM images', (err, results, fields) => {
    //     imagesWithAnnotations(results).then((response) => {
    //         res.send(response);
    //     });
    // });
}
