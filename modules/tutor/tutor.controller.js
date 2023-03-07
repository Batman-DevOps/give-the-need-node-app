const express = require('express');
const router = express.Router();
const TutorService = require('./tutor.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    req.body.createdBy = await getUserId(req);
    TutorService.create(req.body)
        .then((tutor) => res.json({ error: false, success: true, message: "Tutor updated successfully", data: tutor }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function getAll(req, res, next) {
    let _filter = {};
    if (req.query.filters) {
        _filter = req.query.filters
    }
    
    TutorService.getAll(_filter)
        .then(doc => res.json({ error: false, success: true, message: "Tutors fetched successfully", data: doc }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function getById(req, res, next) {
    TutorService.getById(req.params.id)
        .then(tutor => res.json({ error: false, success: true, message: "Tutor fetched successfully", data: tutor }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function update(req, res, next) {
    req.body.updatedBy = await getTutorId(req);
    TutorService.update(req.params.id, req.body)
        .then((tutor) => res.json({ error: false, success: true, message: "Tutor updated successfully", data: tutor }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function uploadProfilePicture(req, res, next) {
    const tutorId = await getTutorId(req)
    req.body.updatedBy = tutorId;
    TutorService.uploadProfilePicture(tutorId, req)
        .then((tutor) => res.json({ error: false, success: true, message: "Profile picture updated successfully", data: tutor }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    TutorService.delete(req.params.id)
        .then((tutor) => res.json({ error: false, success: true, message: "Tutor deleted successfully", data: tutor }))
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
