import FamilyModel from './models/family';
import UserModel from './models/user';
import FamilyService from './services/family';
import UserService from './services/user';

const container = {
  FamilyModel,
  UserModel,
};
container.FamilyService = FamilyService(container);
container.UserService = UserService(container);

export default container;
