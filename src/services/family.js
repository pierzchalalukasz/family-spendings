const FamilyService = ({ FamilyModel }) => {
  const getById = async (id) => {
    const family = await FamilyModel.findById(id);

    return family;
  };

  const createFamily = async (name) => {
    const family = await FamilyModel.create({ name });

    return family;
  };

  const updateBudget = async (_id, budget) => {
    const family = await FamilyModel.updateOne({ _id }, { $set: { budget } });

    return family;
  };

  return {
    getById,
    createFamily,
    updateBudget,
  };
};

export default FamilyService;
