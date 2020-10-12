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
    const family = await FamilyService.getById(id);

    if (!family) {
      throw new ErrorHandler(404, 'Family with given id not found.');
    }

    const { budget } = family;

    return res.json(budget);
  } catch (error) {
    return next(error);
  }
};

export const addSpending = ({ FamilyService }) => async (req, res, next) => {
  const { _id } = req.params;
  const { spentAmount } = req.body;

  const getFamilyById = async (familyId) => {
    const family = await FamilyService.getById(familyId);

    if (!family) {
      throw new ErrorHandler(404, 'Family with given id not found.');
    }

    return family;
  };

  const getNewBudgetValue = (budget) => {
    const updatedBudget = budget - spentAmount;

    const parsedUpdatedBudget = parseNumber(updatedBudget);

    if (parsedUpdatedBudget < 0) {
      throw new ErrorHandler(400, `You cannot add this spending. Your budget is just ${budget}$.`);
    }

    return parsedUpdatedBudget;
  };

  const addSpendingToBudget = async () => {
    const family = await getFamilyById(_id);

    const { budget } = family;

    const newBudgetValue = getNewBudgetValue(budget);

    await FamilyService.updateBudget(_id, newBudgetValue);
  };

  try {
    await addSpendingToBudget();

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
