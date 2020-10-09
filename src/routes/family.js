import { validate } from 'express-validation';
import * as familySchemas from '../schemas/family';
import {
  getById, createFamily, addUserToFamily,
} from '../controllers/family';

export default [
  {
    method: 'GET',
    path: '/family/:id',
    controller: getById,
    middleware: [validate(familySchemas.getById)],
  },
  {
    method: 'POST',
    path: '/family',
    controller: createFamily,
  },
  {
    method: 'PUT',
    path: '/family/:_id',
    controller: addUserToFamily,
  },
];