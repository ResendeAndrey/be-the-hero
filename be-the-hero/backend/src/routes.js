const express = require('express');

const ongController = require('./controllers/ongController.js');
const incidentController = require('./controllers/incidentController.js');
const profileContoller = require('./controllers/profileContoller.js');
const sessionController = require('./controllers/sessionController.js');
const { celebrate, Segments, Joi } = require('celebrate');


const routes = express.Router()

routes.post('/sessions', sessionController.create)

 routes.get('/ongs',  ongController.index) 
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) , ongController.create);

routes.post('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) , incidentController.create);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,  profileContoller.index);



module.exports = routes