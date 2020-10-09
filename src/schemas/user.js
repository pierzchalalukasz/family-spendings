import Joi from '../utils/joi';

export const getById = {
  params: Joi.object({
    id: Joi.objectId().required(),
  }),
};

export const authenticateUser = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const addUser = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean(),
    familyId: Joi.objectId(),
    familyName: Joi.string(),
  }),
};
