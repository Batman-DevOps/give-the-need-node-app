const express = require('express');
const router = express.Router();
const YouthService = require('./youth.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    req.body.createdBy = await getUserId(req);
    YouthService.create(req.body)
        .then((youth) => res.json({ error: false, success: true, message: "Youth updated successfully", data: youth }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function getAll(req, res, next) {
    let _filter = {};
    if (req.query.filters) {
        _filter = req.query.filters
    }
    
    YouthService.getAll(_filter)
        .then(doc => res.json({ error: false, success: true, message: "Youths fetched successfully", data: doc }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function getById(req, res, next) {
    YouthService.getById(req.params.id)
        .then(youth => res.json({ error: false, success: true, message: "Youth fetched successfully", data: youth }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function update(req, res, next) {
    req.body.updatedBy = await getYouthId(req);
    YouthService.update(req.params.id, req.body)
        .then((youth) => res.json({ error: false, success: true, message: "Youth updated successfully", data: youth }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function uploadProfilePicture(req, res, next) {
    const youthId = await getYouthId(req)
    req.body.updatedBy = youthId;
    YouthService.uploadProfilePicture(youthId, req)
        .then((youth) => res.json({ error: false, success: true, message: "Profile picture updated successfully", data: youth }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    YouthService.delete(req.params.id)
        .then((youth) => res.json({ error: false, success: true, message: "Youth deleted successfully", data: youth }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    uploadProfilePicture,
    _delete
};
