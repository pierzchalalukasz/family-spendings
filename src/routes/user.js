import validate from '../middleware/validate';
import { auth } from '../middleware/auth';
import * as userSchemas from '../schemas/user';
import {
  addUser, authenticateUser, loadCurrentUser,
} from '../controllers/user';

export default [
  {
    method: 'GET',
    path: '/user/current',
    controller: loadCurrentUser,
    middleware: [auth],
  },
  {
    method: 'POST',
    path: '/user',
    controller: addUser,
    middleware: [validate(userSchemas.addUser)],
  },
  {
    method: 'POST',
    path: '/user/auth',
    controller: authenticateUser,
    middleware: [validate(userSchemas.authenticateUser)],
  },
];
