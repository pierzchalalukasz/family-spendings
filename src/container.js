import FamilyModel from './models/family';
import UserModel from './models/user';
import FamilyService from './services/family';
import UserService from './services/user';

const createContainer = (db, config) => {
  const container = {
    db,
    config,
    FamilyModel,
    UserModel,
  };
  container.FamilyService = FamilyService(container);
  container.UserService = UserService(container);

  return container;
};

export default createContainer;
