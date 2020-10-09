import { ErrorHandler } from '../utils/error';

export const getById = ({ FamilyService }) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const family = await FamilyService.getById(id);
    if (!family) {
      throw new ErrorHandler(404, 'Family with given id not found.');
    }
    return res.json(family);
  } catch (error) {
    return next(error);
  }
};

export const createFamily = ({ FamilyService }) => async (req, res, next) => {
  try {
    const { name } = req.body;
    const family = await FamilyService.createFamily(name);
    return res.json(family);
  } catch (error) {
    return next(error);
  }
};
