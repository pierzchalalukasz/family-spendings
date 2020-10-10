import Joi from '../utils/joi';

// eslint-disable-next-line import/prefer-default-export
export const getById = {
  params: Joi.object({
    id: Joi.objectId().required(),
  }),
};

export const createFamily = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

export const addSpending = {
  params: Joi.object({
    _id: Joi.objectId().required(),
  }),
  body: Joi.object({
    spentAmount: Joi.number().min(0).required(),
  }),
};

export const addFund = {
  params: Joi.object({
    _id: Joi.objectId().required(),
  }),
  body: Joi.object({
    newFund: Joi.number().min(0).required(),
  }),
};
