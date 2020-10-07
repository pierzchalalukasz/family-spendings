import { validate } from 'express-validation';
import * as userSchemas from '../schemas/user';
import { getById, addUser, getAll } from '../controllers/user';

export default [
  {
    method: 'GET',
    path: '/user/:id',
    controller: getById,
    middleware: [validate(userSchemas.getById)],
  },
  {
    method: 'GET',
    path: '/user',
    controller: getAll,
  },
  {
    method: 'POST',
    path: '/user',
    controller: addUser,
    middleware: [validate(userSchemas.addUser)],
  },
];
