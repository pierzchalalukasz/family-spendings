import bcrypt from 'bcrypt';

export const getById = ({ UserModel }) => async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return res.send(404);
  }

  return res.json(user);
};

export const addUser = ({ UserModel }) => async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //  Checking if user with given email is not already in db
    const userAlreadyExists = await UserModel.find({ email });
    if (userAlreadyExists) {
      throw Error('User with given email already exists.');
    }
    // Creating salt to hash password
    const salt = await bcrypt.genSalt(10);
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, salt);
    //  Creating a new user
    const user = await UserModel.create(email, name, hashedPassword);
    if (!user) {
      throw Error('An error occured when creating a new user.');
    }

    res.send(user);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

export const getAll = ({ UserModel }) => async (req, res) => {
  const users = await UserModel.find();

  res.send({ users });
};
