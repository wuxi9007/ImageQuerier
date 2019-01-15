const { con } = require('./db');

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
    const image = {
        'path': req.file.filename,
        'user_id': parseInt(userID),
        'created_at': new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    saveImage(image).then((id) => {
        console.log(id);
        res.send(id);
    })
}



const saveAnnotation = (annotations, imageID, callback) => {
    for (var i in annotations) {
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var annotation = {
            'image_id': imageID,
            'label': i,
            'created_at': currentTime
        };
        if (annotations[i][1].length === 0 || isNaN(parseFloat(annotations[i][0]))) {
            annotation['string_value'] = annotations[i][0];
        } else {
            annotation['numeric_value'] = parseFloat(annotations[i][0]);
            annotation['units'] = annotations[i][1];
        }
        con.connection.query('INSERT INTO annotations SET ?', annotation, (err, result, fields) => {
            if (err) {
                console.log(err);
                // resolve("Cannot save data!");
            } else {
                // resolve("Data saved");
            }
        });
    }
    callback();
}

exports.addImageAnnotations = (req, res, next) => {
    console.log("annotate");
    const { imageID, annotations, title } = req.body;
    var updateQuery = "UPDATE images SET title = '" + title + "' WHERE id = " + imageID;
    con.connection.query(updateQuery, (err, result, fields) => {
        if (!err) {
            saveAnnotation(annotations, imageID, () => {
                res.send("annotated.");
            });
        }
    });
}

exports.syncImageFromMobile = (req, res) => {
    var { annotations, title, userID } = req.body;
    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var image = {
        'path': req.file.filename,
        'user_id': parseInt(userID),
        'title': title,
        'created_at': currentTime
    };
    saveImage(image).then((id) => {
        saveAnnotation(JSON.parse(annotations), id, () => {
            res.send("annotated.")
        });
    });
}
