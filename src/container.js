import UserModel from './models/user';
import UserService from './services/user';

const container = {
  UserModel,
};
container.UserService = UserService(container);

export default container;
