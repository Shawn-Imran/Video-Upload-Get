const express = require('express');

// Created Require Files..
const controller = require('../controller/upload');

// Get Express Router Function..
const router = express.Router();

/**
 * /api/upload
 * http://localhost:3001/api/upload
 */

router.post('/single-video', controller.multerSingleVideo.single(process.env.VIDEO_FIELD), controller.uploaderVideo);
// get all videos
router.get('/all-videos', controller.getAllVideos);

// Export All router..
module.exports = router;
