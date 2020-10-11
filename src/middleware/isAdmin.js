import { ErrorHandler } from './error';

const isAdmin = () => async (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }
  return next(new ErrorHandler(403, 'Access forbidden.'));
};

export default isAdmin;
