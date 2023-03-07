const express = require('express');
const bannerRoutes = require('express').Router();
const sessions = require('express-session');
const app = express();
const multer = require('multer');
const upload = multer();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "longlivenodejsafterallitsjavascript3cheershiphiphurray",
    saveUninitialized: true,
    cookie: { maxAge: oneDay * 2 },
    resave: false
}));

const {
    update,
    uploadProfilePicture,
    getAll,
    getById,
    _delete
} = require('./banner.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

sessions.Session.prototype.authenticate = (req, banner, cb) => {
    try {
        req.session.bannerInfo = banner
        req.session.banner = banner.email
        cb();
    } catch (error) {
        cb(error);
    }
}

bannerRoutes.get('/banners/getAll', isAuthenticated, getAll);
bannerRoutes.get('/banners/getById/:id', isAuthenticated, getById);
bannerRoutes.put('/banners/update/:id', isAuthenticated, update);
bannerRoutes.put('/banners/uploadProfilePicture', upload.single(`file`), uploadProfilePicture);
bannerRoutes.put('/banners/delete', upload.single(`file`), _delete);

module.exports = bannerRoutes;