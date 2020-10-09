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

export const updateBudget = ({ FamilyService }) => async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { spentAmount } = req.body;

    const family = await FamilyService.getById(_id);

    if (!family) {
      throw new ErrorHandler(404, 'Family with given id not found.');
    }

    const { budget } = family;

    const updatedBudget = budget - spentAmount;

    if (updatedBudget < 0) {
      throw new ErrorHandler(400, 'You cannot add this spending, your budget is too low.');
    }

    await FamilyService.updateBudget(_id, updatedBudget);

    return res.sendStatus(200).json({ message: 'Your budget has been updated.' });
  } catch (error) {
    return next(error);
  }
};
