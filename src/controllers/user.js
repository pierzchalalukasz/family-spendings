export const getById = ({ UserModel }) => async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return res.send(404);
  }

  return res.json(user);
};

export const addUser = ({ UserModel }) => async (req, res) => {
  const user = await UserModel.create(req.body);

  res.send(user);
};

export const getAll = ({ UserModel }) => async (req, res) => {
  const users = await UserModel.find();

  res.send({ users });
};
