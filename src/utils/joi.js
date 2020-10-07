import { Joi } from 'express-validation';
import objectId from 'joi-objectid';

Joi.objectId = objectId(Joi);

export default Joi;
