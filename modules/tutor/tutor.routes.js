const tutorRoutes = require('express').Router();

const {
    create,
    update,
    getAll,
    getById,
    _delete
} = require('./tutor.controller');

const { isAuthenticated } = require('../../middlewares/isAuthenticated');

tutorRoutes.post('/tutors/create', isAuthenticated, create);
tutorRoutes.get('/tutors/getAll', getAll);
tutorRoutes.get('/tutors/getById/:id', isAuthenticated, getById);
tutorRoutes.put('/tutors/update/:id', isAuthenticated, update);
tutorRoutes.delete('/tutors/delete/:id', isAuthenticated, _delete);

module.exports = tutorRoutes;