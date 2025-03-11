const express = require('express');

const routes = express.Router();

routes.use('/', require('./authroute'))



module.exports = routes;