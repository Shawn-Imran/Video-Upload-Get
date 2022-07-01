const express = require('express');

// Imports
const controller = require('../controller/gallery');
const checkAdminAuth = require('../middileware/check-admin-auth');
const checkIpWhitelist = require('../middileware/check-ip-whitelist');


// Get Express Router Function..
const router = express.Router();

/**
 * /api/gallery
 * http://localhost:3000/api/gallery
 */

router.post('/add-new-gallery',checkIpWhitelist,checkAdminAuth, controller.addNewGalleryImage);
router.post('/add-new-gallery-multi',checkIpWhitelist,checkAdminAuth, controller.addNewGalleryMultiImage);
router.get('/get-all-gallery-list',checkIpWhitelist,checkAdminAuth, controller.getAllGalleryImage);
router.get('/get-gallery-details-by-id/:id',checkIpWhitelist,checkAdminAuth, controller.getSingleGalleryImageById);
router.delete('/delete-gallery-by-id/:id',checkIpWhitelist,checkAdminAuth, controller.deleteGalleryImageById);
router.post('/delete-gallery-images-multi',checkIpWhitelist,checkAdminAuth, controller.deleteGalleryImageMulti);
router.put('/edit-gallery-by-id',checkIpWhitelist,checkAdminAuth, controller.editGalleryImageData);
router.get('/search-image-by-regex', controller.getSearchImageByRegex);


// Export router class..
module.exports = router;
