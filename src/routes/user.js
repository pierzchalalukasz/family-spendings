import { validate } from 'express-validation';
import * as userSchemas from '../schemas/user';
import {
  getById, addUser, authenticateUser, getAll,
} from '../controllers/user';

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
    path: '/user/add',
    controller: addUser,
    middleware: [validate(userSchemas.addUser)],
  },
  {
    method: 'POST',
    path: '/user/authenticate',
    controller: authenticateUser,
    middleware: [validate(userSchemas.authenticateUser)],
  },
];
