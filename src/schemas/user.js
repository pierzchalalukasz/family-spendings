import Joi from '../utils/joi';

export const authenticateUser = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

export const addUser = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).valid(Joi.ref('password')).required(),
    isAdmin: Joi.boolean().required(),
    familyId: Joi.when('isAdmin', { is: false, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
    familyName: Joi.when('isAdmin', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  }),
};
