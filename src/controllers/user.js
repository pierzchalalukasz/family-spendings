import { HttpError } from '../middleware/error';

export const authenticateUser = ({ UserService }) => async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.authenticateUser(email, password);

    if (!result) {
      throw new HttpError(404, 'User with given credentials not found.');
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
        throw new HttpError(404, 'Family with given id not found.');
      }
      const user = await UserService.addUser(req.body);
      if (!user) {
        throw new HttpError(409, 'User with given email already exists.');
      }
      return res.json(user);
    }

    const { familyName } = req.body;

    const family = await FamilyService.createFamily(familyName);

    const { _id } = family;
    const user = await UserService.addUser({ ...req.body, familyId: _id });

    if (!user) {
      throw new HttpError(409, 'User with given email already exists.');
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
