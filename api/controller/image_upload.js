const multer = require("multer");

// configure multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${new Date().toISOString()}_${file.originalname}`);
  },
});

// accept only files ending in jpeg, jpg and png extensions
const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('You can upload only image files'), false);
  }
  callback(null, true);
};

// export the file upload handler
module.exports = multer({ storage, fileFilter: imageFileFilter });
