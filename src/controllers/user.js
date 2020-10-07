import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getById = ({ UserModel }) => async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return res.send(404);
  }

  return res.json(user);
};

export const authenticateUser = ({ UserModel }) => async (req, res) => {
  const { email, password } = req.body;

  try {
    //  Checking if user with given email exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw Error('User with given email does not exist.');
    }

    const { _id, name } = user;
    //  Password validation comparing hash of given password with hashed password from db
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw Error('Credentials are not valid.');
    }
    // Creating JWT token based on user's _id and TOKKEN_SERCRET
    const token = jwt.sign({ _id }, process.env.TOKEN_SECRET);

    return res.json({
      token,
      user: {
        _id,
        name,
        email,
      },
    });
  } catch (error) {
    return res.status(400).json({ errorMsg: error.message });
  }
};

export const addUser = ({ UserModel }) => async (req, res) => {
  const {
    name, email, password, isAdmin,
  } = req.body;

  try {
    //  Checking if user with given email is not already in db
    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      throw Error('User with given email already exists.');
    }
    // Creating salt to hash password
    const salt = await bcrypt.genSalt(10);
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, salt);
    //  Creating a new user
    const user = await UserModel.create({
      email, name, password: hashedPassword, isAdmin,
    });
    if (!user) {
      throw Error('An error occured when creating a new user.');
    }

    return res.send(user);
  } catch (error) {
    return res.status(400).json({ errorMsg: error.message });
  }
};

export const getAll = ({ UserModel }) => async (req, res) => {
  const users = await UserModel.find();

  res.send({ users });
};
