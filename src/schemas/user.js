import Joi from '../utils/joi';

export const getById = {
  params: Joi.object({
    id: Joi.objectId().required(),
  }),
};

export const addUser = {
  body: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
