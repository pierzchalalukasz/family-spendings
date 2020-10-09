export const getById = ({ UserService }) => async (req, res) => {
  const user = await UserService.getById(req.params.id);
  if (!user) {
    return res.sendStatus(404);
  }
  return res.json(user);
};

export const authenticateUser = ({ UserService }) => async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await UserService.authenticateUser(email, password);

  if (!user) {
    return res.sendStatus(404);
  }
  return res.json({ user, token });
};

export const addUser = ({ UserService, FamilyService }) => async (req, res) => {
  const { isAdmin } = req.body;

  if (!isAdmin) {
    const user = await UserService.addUser(req.body);
    if (!user) {
      return res.sendStatus(409);
    }
    return res.json(user);
  }

  const { familyName } = req.body;
  const family = await FamilyService.createFamily(familyName);
  const { _id } = family;
  const user = await UserService.addUser({ ...req.body, familyId: _id });
  if (!user) {
    return res.sendStatus(409);
  }
  return res.json(user);
  // return res.sendStatus(500);
};

export const getAll = ({ UserService }) => async (req, res) => {
  const users = await UserService.getAll();
  if (!users) {
    return res.sendStatus(404);
  }
  return res.json(users);
};
