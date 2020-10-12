import { ErrorHandler } from '../middleware/error';
import parseNumber from '../utils/parseNumber';

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

export const getBudgetByFamilyId = ({ FamilyService }) => async (req, res, next) => {
  try {
    const { id } = req.params;

    const budget = await FamilyService.getBudgetByFamilyId(id);

    if (!budget) {
      throw new ErrorHandler(404, 'Family with given id not found.');
    }
    return res.json(budget);
  } catch (error) {
    return next(error);
  }
};

export const addSpending = ({ FamilyService }) => async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { spentAmount } = req.body;

    const family = await FamilyService.getById(_id);

    if (!family) {
      throw new ErrorHandler(404, 'Family with given id not found.');
    }

    const { budget } = family;
    const parsedSpentAmount = parseNumber(spentAmount);

    const updatedBudget = budget - parsedSpentAmount;

    const parsedUpdatedBudget = parseNumber(updatedBudget);

    if (updatedBudget < 0) {
      throw new ErrorHandler(400, `You cannot add this spending. Your budget is just ${budget}$.`);
    }

    await FamilyService.updateBudget(_id, parsedUpdatedBudget);

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

export const addFund = ({ FamilyService }) => async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { newFund } = req.body;

    const family = await FamilyService.getById(_id);

    if (!family) {
      throw new ErrorHandler(404, 'Family with given id not found.');
    }

    const parsedNewFund = parseNumber(newFund);

    const { budget } = family;

    const updatedBudget = budget + parsedNewFund;

    const parsedUpdatedBudget = parseNumber(updatedBudget);

    await FamilyService.updateBudget(_id, parsedUpdatedBudget);

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};
