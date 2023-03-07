const express = require('express');
const router = express.Router();
const BannerService = require('./banner.service');

const { sendResponse } = require('../../utils');

module.exports = router;

async function getAll(req, res, next) {
    let _filter = {};
    if (req.query.filters) {
        _filter = req.query.filters
    }
    
    BannerService.getAll(_filter)
        .then(doc => res.json({ error: false, success: true, message: "Banners fetched successfully", data: doc }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function getById(req, res, next) {
    BannerService.getById(req.params.id)
        .then(banner => res.json({ error: false, success: true, message: "Banner fetched successfully", data: banner }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function update(req, res, next) {
    req.body.updatedBy = await getBannerId(req);
    BannerService.update(req.params.id, req.body)
        .then((banner) => res.json({ error: false, success: true, message: "Banner updated successfully", data: banner }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function uploadProfilePicture(req, res, next) {
    const bannerId = await getBannerId(req)
    req.body.updatedBy = bannerId;
    BannerService.uploadProfilePicture(bannerId, req)
        .then((banner) => res.json({ error: false, success: true, message: "Profile picture updated successfully", data: banner }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    BannerService.delete(req.params.id)
        .then((banner) => res.json({ error: false, success: true, message: "Banner deleted successfully", data: banner }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

module.exports = {
    getAll,
    getById,
    update,
    uploadProfilePicture,
    _delete
};
