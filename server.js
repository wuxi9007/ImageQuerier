const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
var router = express.Router();
var login = require('./routes/LoginRoutes');
var ImageUpload = require('./routes/UploadRoutes');
var Fetch = require('./routes/FetchRoutes');

// save images in /public
var path = require('path');
var fs = require('fs');
var dir = path.join(__dirname, 'public');
if (!fs.existsSync(dir)) {
    console.log('creating folder');
    fs.mkdirSync(dir);
}
app.use(express.static(dir));

// routes to handle user registration and login
router.post('/signup', login.register);
router.post('/login', login.login);

// routes to upload images and annotations
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
})
var upload = multer({ storage });
router.post('/createImage', upload.single('imageData'), ImageUpload.createImage);
router.post('/addImageAnnotations', ImageUpload.addImageAnnotations);
router.post('/syncImageFromMobile', upload.single('imageData'), ImageUpload.syncImageFromMobile);

// routes to fetch images from client
router.get('/imageLibrary', Fetch.imageLibrary);

app.use(router);
app.listen(3210, () => {
    console.log('MySQL server is listening on port 3210');
})
