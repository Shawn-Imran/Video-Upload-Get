const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Video = require('../models/video');



/**
 * UPLOAD FILE
 */

const fileStorageForPDF = multer.diskStorage({
    destination: (req, file, cb) => {
        // Destination Folder Dynamic..
        const dir = './uploads/pdf'

        // Check Folder Exists or not
        fs.exists(dir, exist => {
            if (!exist) {
                return fs.mkdir(dir, err => cb(err, dir))
            }
            return cb(null, dir);
        })

    },
    filename: (req, file, cb) => {
        const name = file.fieldname.toLowerCase().split(' ').join('-') + Date.now() + path.extname(file.originalname)
        cb(null, name);
    }
});

function checkPdfFileType(file, cb) {
    // Allowed Ext..
    const fileTypes = /mp4|mkv|3gp|wemb|flv|m/;
    // Check Extension..
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check MimeTypes..
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error! PDF Only!');
    }

}


exports.multerConfigPdf = multer({
    storage: fileStorageForPDF,
    limits: {fileSize: 50000000},
    fileFilter: function (req, file, cb) {
        checkPdfFileType(file, cb)
    }
})


exports.uploaderPdf = (req, res, next) => {
    if (req.file === undefined) {
        const error = new Error('No Pdf File provide');
        next(error)
        // res.status(404).json({
        //     message: 'No PDF Provided'
        // });
        return;
    }
    // Base Url..
    const baseurl = req.protocol + '://' + req.get("host");
    const path = req.file.path.split('\\').join('/');
    // const realPath = path.split('\\').join('/');
    const downloadUrl = `${baseurl}/${path}`;

    const video = new Video({url:downloadUrl});
    const newvideo = video.save();

    res.status(200).json({
        data: newvideo,
        message: 'Success',
        videoUrl: downloadUrl
    });

};


exports.getAllVideos = async (req, res, next) => {
    
        const videos = await Video.find().then(videos => {
                res.status(200).json({
                    data: videos,
                    message: 'Success'
                });
            
            })
            
            .catch(err => {
                next(err);
            });

}
