const youthRoutes = require('express').Router();

const {
    create,
    update,
    getAll,
    getById,
    _delete
} = require('./youth.controller');

const { isAuthenticated } = require('../../middlewares/isAuthenticated');

youthRoutes.post('/youths/create', isAuthenticated, create);
youthRoutes.get('/youths/getAll', getAll);
youthRoutes.get('/youths/getById/:id', isAuthenticated, getById);
youthRoutes.put('/youths/update', isAuthenticated, update);
youthRoutes.delete('/youths/delete/:id', isAuthenticated, _delete);

module.exports = youthRoutes;