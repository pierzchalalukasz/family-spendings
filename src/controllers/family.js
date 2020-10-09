export const getById = ({ FamilyService }) => async (req, res) => {
  const { id } = req.params;
  const family = await FamilyService.getById(id);
  if (!family) {
    return res.send(404);
  }
  return res.json(family);
};

export const createFamily = ({ FamilyService }) => async (req, res) => {
  const { name } = req.body;
  const family = await FamilyService.createFamily(name);
  if (!family) {
    return res.send(404);
  }
  return res.json(family);
};
