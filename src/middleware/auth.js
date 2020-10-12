import jwt from 'jsonwebtoken';
import { HttpError } from './error';

// eslint-disable-next-line import/prefer-default-export
export const auth = ({ UserService }) => async (req, res, next) => {
  const token = req.header('Authentication');

  const getUserIdFromToken = () => {
    try {
      const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);

      return _id;
    } catch (error) {
      throw new HttpError(401, 'Token is not valid.');
    }
  };

  const getUserById = async (userId) => {
    const user = await UserService.getById(userId);

    if (!user) {
      throw new HttpError(401, 'Token is not valid.');
    }

    return user;
  };

  const assignUserToRequest = (user) => {
    req.user = user;
  };

  const authenticate = async () => {
    if (!token) {
      throw new HttpError(401, 'No token, authorization denied.');
    }

    const userId = getUserIdFromToken(token);

    const user = await getUserById(userId);

    assignUserToRequest(user);
  };

  try {
    await authenticate();

    return next();
  } catch (error) {
    return next(error);
  }
};
