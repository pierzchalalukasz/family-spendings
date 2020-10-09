export const getById = ({ UserService }) => async (req, res) => {
  const user = await UserService.getById(req.params.id);
  if (!user) {
    return res.send(404);
  }
  return res.json(user);
};

export const authenticateUser = ({ UserService }) => async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await UserService.authenticateUser(email, password);

  if (!user) {
    return res.send(404);
  }
  return res.json({ user, token });
};

export const addUser = ({ UserService }) => async (req, res) => {
  const user = await UserService.addUser(req.body);
  if (!user) {
    return res.send(409);
  }
  return res.json(user);
};

export const getAll = ({ UserService }) => async (req, res) => {
  const users = await UserService.getAll();
  if (!users) {
    return res.send(404);
  }
  return res.json(users);
};
