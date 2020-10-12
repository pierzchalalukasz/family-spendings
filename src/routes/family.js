import validate from '../middleware/validate';
import { auth } from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';
import * as familySchemas from '../schemas/family';
import {
  getById, addSpending, addFund, getBudgetByFamilyId,
} from '../controllers/family';

export default [
  {
    method: 'GET',
    path: '/family/:id',
    controller: getById,
    middleware: [auth, validate(familySchemas.getById)],
  },
  {
    method: 'GET',
    path: '/family/:id/budget',
    controller: getBudgetByFamilyId,
    middleware: [auth, validate(familySchemas.getBudgetByFamilyId)],
  },
  {
    method: 'PUT',
    path: '/family/:_id/spending',
    controller: addSpending,
    middleware: [auth, validate(familySchemas.addSpending)],
  },
  {
    method: 'PUT',
    path: '/family/:_id/fund',
    controller: addFund,
    middleware: [auth, isAdmin, validate(familySchemas.addFund)],
  },
];
