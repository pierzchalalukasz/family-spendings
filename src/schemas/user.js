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
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    isAdmin: Joi.boolean(),
    familyId: Joi.when('isAdmin', { is: false, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
    familyName: Joi.when('isAdmin', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  }),
};
