const express = require('express');

// Created Require Files..
const controller = require('../controller/upload');

// Get Express Router Function..
const router = express.Router();

/**
 * /api/upload
 * http://localhost:3000/api/upload
 */

router.post('/single-video', controller.multerConfigPdf.single(process.env.VIDEO_FIELD), controller.uploaderPdf);
// get all videos
router.get('/all-videos', controller.getAllVideos);

// Export All router..
module.exports = router;
