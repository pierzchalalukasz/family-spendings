import validate from '../middleware/validate';
import { auth } from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';
import * as familySchemas from '../schemas/family';
import {
  getById, createFamily, addSpending, addFund,
} from '../controllers/family';

export default [
  {
    method: 'GET',
    path: '/family/:id',
    controller: getById,
    middleware: [auth, validate(familySchemas.getById)],
  },
  {
    method: 'POST',
    path: '/family',
    controller: createFamily,
    middleware: [validate(familySchemas.createFamily)],
  },
  {
    method: 'PATCH',
    path: '/family/:_id/spending',
    controller: addSpending,
    middleware: [validate(familySchemas.addSpending)],
  },
  {
    method: 'PATCH',
    path: '/family/:_id/fund',
    controller: addFund,
    middleware: [auth, isAdmin, validate(familySchemas.addFund)],
  },
];
