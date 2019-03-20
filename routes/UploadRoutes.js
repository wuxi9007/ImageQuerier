const con = require('./db');
const Image = require('../models').Image;
const Annotation = require('../models').Annotation;
const saveImage = (image) => {
    return new Promise((resolve, reject) => {
        con.connection.query('INSERT INTO images SET ?', image, (err, result, fields) => {
            if (!err) {
                // send imageID
                resolve(result.insertId.toString());
            }
        });
    });
}

exports.createImage = (req, res, next) => {
    console.log("got image");
    const { userID } = req.body;
    // sequelize save image
    const image = Image.build({
        'path': req.file.filename,
        'userId': userID
    });
    image.save().then(i => {
        res.send({
            imageId: i.id
        });
    }).catch((err) => {
        console.log(err);
    });
}



const saveAnnotation = (annotations, imageID, callback) => {
    for (var i in annotations) {
        // sequelize save annotations
        const annotation = Annotation.build({
            'imageId': parseInt(imageID),
            'label': i
        });
        if (annotations[i][1].length === 0 && isNaN(parseFloat(annotations[i][0]))) {
            annotation.string_value = annotations[i][0];
        } else {
            annotation.numeric_value = parseFloat(annotations[i][0]);
            annotation.units = annotations[i][1];
        }
        annotation.save();
    }
    callback();
}

exports.addImageAnnotations = (req, res, next) => {
    console.log("annotate");
    const { imageID, annotations, title } = req.body;
    Image.findOne({
        where: {
            id: imageID
        }
    }).then(i => {
        i.title = title;
        i.save();
    });
    saveAnnotation(annotations, imageID, () => {
        res.send("annotated.");
    });
}

exports.syncImageFromMobile = (req, res) => {
    var { annotations, title, userID } = req.body;
    // sequelize save images and annotations
    Image.create({
        'path': req.file.filename,
        'userId': parseInt(userID),
        'title': title
    }).then((image) => {
        saveAnnotation(JSON.parse(annotations), image.id, () => {
            res.send("annotated.")
        });
    });
}
