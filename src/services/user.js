import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../middleware/error';

const UserService = ({ UserModel }) => {
  const getById = async (id) => {
    const user = await UserModel.findById(id).select('-password');
    return user;
  };

  const authenticateUser = async (email, password) => {
    //  Checking if user with given email exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ErrorHandler(404, 'User with given email not found.');
    }

    const {
      _id, name, isAdmin, familyId,
    } = user;
    //  Password validation comparing hash of given password with hashed password from db
    const validPassword = await bcrypt.compare(password, user.password);

    // Creating JWT token based on user's _id and TOKKEN_SERCRET
    if (user && validPassword) {
      const token = jwt.sign({ _id }, process.env.TOKEN_SECRET);

      return {
        token,
        user: {
          _id,
          name,
          email,
          isAdmin,
          familyId,
        },
      };
    }
    return null;
  };

  const addUser = async ({
    name, email, password, isAdmin, familyId,
  }) => {
    //  Checking if user with given email is not already in db
    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      return null;
    }
    // Creating salt to hash password
    const salt = await bcrypt.genSalt(10);
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, salt);
    //  Creating a new user
    const user = await UserModel.create({
      email, name, password: hashedPassword, isAdmin, familyId,
    });

    return user;
  };

  const getAll = async () => {
    const users = await UserModel.find();

    return users;
  };

  return {
    getById,
    authenticateUser,
    addUser,
    getAll,
  };
};

export default UserService;
