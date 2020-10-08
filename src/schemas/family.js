import Joi from '../utils/joi';

// eslint-disable-next-line import/prefer-default-export
export const getById = {
  params: Joi.object({
    id: Joi.objectId().required(),
  }),
};
