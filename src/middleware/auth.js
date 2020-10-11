import jwt from 'jsonwebtoken';
import { ErrorHandler } from './error';

// eslint-disable-next-line import/prefer-default-export
export const auth = (req, res, next) => {
  try {
    const token = req.header('Authentication');

    if (!token) {
      throw new ErrorHandler(401, 'No token, authorization denied.');
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;

      return next();
    } catch (error) {
      throw new ErrorHandler(400, 'Token is not valid.');
    }
  } catch (error) {
    return next(error);
  }
};
