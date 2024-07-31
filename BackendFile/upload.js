const multer = require('multer');
const path = require('path');

// Set storage 
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },

}).single('file');


module.exports=upload;








