import { ErrorHandler } from '../middleware/error';

export const getById = ({ UserService }) => async (req, res, next) => {
  try {
    const user = await UserService.getById(req.params.id);

    if (!user) {
      throw new ErrorHandler(404, 'User with given id not found.');
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const authenticateUser = ({ UserService }) => async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.authenticateUser(email, password);

    if (!result) {
      throw new ErrorHandler(404, 'User with given credentials not found.');
    }

    const { user, token } = result;

    return res.json({ user, token });
  } catch (error) {
    return next(error);
  }
};

export const addUser = ({ UserService, FamilyService }) => async (req, res, next) => {
  try {
    const { isAdmin } = req.body;

    if (!isAdmin) {
      const { familyId } = req.body;
      const family = await FamilyService.getById(familyId);
      if (!family) {
        throw new ErrorHandler(404, 'Family with given id not found.');
      }
      const user = await UserService.addUser(req.body);
      if (!user) {
        throw new ErrorHandler(409, 'User with given email already exists.');
      }
      return res.json(user);
    }

    const { familyName } = req.body;

    const family = await FamilyService.createFamily(familyName);

    const { _id } = family;
    const user = await UserService.addUser({ ...req.body, familyId: _id });

    if (!user) {
      throw new ErrorHandler(409, 'User with given email already exists.');
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const loadCurrentUser = () => async (req, res, next) => {
  try {
    const { user } = req;

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const getAll = ({ UserService }) => async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    if (!users) {
      throw new ErrorHandler(404, 'Users not found.');
    }
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};
