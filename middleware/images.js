
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/Images'); // Define your upload destination
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      const originalFilename = path.basename(file.originalname, extname);
      const timestamp = Date.now();
      cb(null, `file_${originalFilename}_${timestamp}${extname}`);
    },
  });
  
  const upload = multer({ storage: storage });

module.exports = upload;
