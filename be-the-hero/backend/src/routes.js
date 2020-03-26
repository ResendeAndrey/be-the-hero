const express = require('express');

const ongController = require('./controllers/ongController.js');
const incidentController = require('./controllers/incidentController.js');
const profileContoller = require('./controllers/profileContoller.js');
const sessionController = require('./controllers/sessionController.js');


const routes = express.Router()

routes.post('/sessions', sessionController.create)

 routes.get('/ongs', ongController.index) 
routes.post('/ongs', ongController.create);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', profileContoller.index);

module.exports = routes