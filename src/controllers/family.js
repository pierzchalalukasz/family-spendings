export const getById = ({ FamilyModel }) => async (req, res) => {
  const family = await FamilyModel.findById(req.params.id);

  if (!family) {
    return res.send(404);
  }

  return res.json(family);
};

export const createFamily = ({ FamilyModel }) => async (req, res) => {
  const family = await FamilyModel.create(req.body);

  return res.send(family);
};

export const addUserToFamily = ({ FamilyModel }) => async (req, res) => {
  const { _id } = req.params;
  const { userId } = req.body;
  const addedUser = await FamilyModel.updateOne({ _id }, { $push: { members: userId } });

  return res.json(addedUser);
};
