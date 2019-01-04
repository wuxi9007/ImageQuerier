const con = require('./Connection');

saveImage = (image) => {
    con.connection.query('INSERT INTO images SET ?', image, (err, result, fields) => {
        if (!err) {
            // send imageID
            return result.insertId.toString();
        }
    })
}

exports.createImage = (req, res, next) => {
    console.log("got image");
    const { userID } = req.body;
    const image = {
        'path': req.file.filename,
        'user_id': parseInt(userID),
        'created_at': new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    res.send(saveImage(image));
}



saveAnnotation = (annotations, imageID, res) => {
    for (var i in annotations) {
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var annotation = {
            'image_id': imageID,
            'label': i,
            'created_at': currentTime
        };
        if (annotations[i][1].length === 0) {
            annotation['string_value'] = annotations[i][0];
        } else {
            annotation['numeric_value'] = parseFloat(annotations[i][0]);
            annotation['units'] = annotations[i][1];
        }
        con.connection.query('INSERT INTO annotations SET ?', annotation, (err, result, fields) => {
            if (err) {
                res.send("Cannot save data!");
            } else {
                res.send("Data saved");
            }
        })
    }
}

exports.addImageAnnotations = (req, res, next) => {
    console.log("annotate");
    const { imageID, annotations, title } = req.body;
    saveAnnotation(annotations, imageID);
}

exports.syncImageFromMobile = (req, res) => {
    var { annotations, title, userID } = req.body;
    var image = {
        'path': req.file.filename,
        'user_id': parseInt(userID),
        'title': title
    };
    saveAnnotation(JSON.parse(annotations), saveImage(image), res);
}
