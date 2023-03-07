const allRoutes = require('express').Router();
const v1Routes = require('./v1');
const express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Give The Need API'
    })
});

allRoutes.use('/v1', v1Routes);

module.exports = allRoutes;