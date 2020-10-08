export const getById = ({ UserService }) => async (req, res) => {
  UserService.getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)));
  // .catch((err) => next(err));
};

export const authenticateUser = ({ UserService }) => async (req, res) => {
  const { email, password } = req.body;
  UserService.authenticateUser(email, password)
    .then((user) => (user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect.' })));
  // .catch((err) => next(err));
};

export const addUser = ({ UserService }) => async (req, res) => {
  UserService.addUser(req.body)
    .then((user) => (user ? res.json(user) : res.status(409).json({ message: 'The user with given email already exists.' })));
  // .catch((err) => next(err));
};

export const getAll = ({ UserService }) => async (req, res) => {
  UserService.getAll()
    .then((users) => res.json(users));
  // .catch(((err) => next(err)));
};
