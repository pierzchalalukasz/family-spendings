const FamilyService = ({ FamilyModel }) => {
  const getById = async (id) => {
    const family = await FamilyModel.findById(id);

    return family;
  };

  const createFamily = async (name) => {
    const family = await FamilyModel.create({ name });

    return family;
  };

  return {
    getById,
    createFamily,
  };
};

export default FamilyService;
