import { HttpError } from './error';

const isAdmin = () => async (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }
  return next(new HttpError(403, 'Access forbidden.'));
};

export default isAdmin;
