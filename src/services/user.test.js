import bcrypt from 'bcrypt';
import UserService from './user';
import { HttpError } from '../middleware/error';

describe('user service', () => {
  const UserModel = {
    findById: jest.fn(),
    findOne: jest.fn(),
  };

  const config = {
    TOKEN_SECRET: 'secret',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getById', () => {
    it('when user with given id exists - returns the user', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';

      const user = {
        id,
        name: 'Some name',
      };

      UserModel.findById.mockImplementationOnce(() => ({
        select: async () => user,
      }));

      // when
      const result = await UserService({ UserModel }).getById(id);

      // then
      expect(UserModel.findById).toBeCalledWith(id);
      expect(result).toEqual(user);
    });
  });

  describe('authenticateUser', () => {
    it('when given credentials are correct - returns the user and JWT token', async () => {
      // given
      const email = 'sample@mail.com';
      const password = 'samplepass123';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        _id: 'a9892831928398',
        name: 'Sample name',
        email,
        isAdmin: true,
        familyId: 'u21u3io123ui',
      };

      UserModel.findOne.mockImplementationOnce(async () => ({
        ...user,
        password: hashedPassword,
      }));

      // when
      const result = await UserService({ UserModel, config }).authenticateUser(email, password);

      // then
      expect(UserModel.findOne).toBeCalledWith({ email });
      expect(result).toEqual(expect.objectContaining({
        user,
        token: expect.any(String),
      }));
    });

    it('when user not found - returns 404', async () => {
      // given
      const email = 'sample@mail.com';
      const password = 'samplepass123';

      UserModel.findOne.mockImplementationOnce(async () => undefined);

      // when
      const promise = UserService({ UserModel, config }).authenticateUser(email, password);

      // then
      await expect(promise).rejects.toEqual(new HttpError(404, 'User with given email not found.'));
      expect(UserModel.findOne).toBeCalledWith({ email });
    });

    it('when password is not correct - returns null', async () => {
      // given
      const email = 'sample@mail.com';
      const providedPassword = 'samplepass123';
      const hashedPassword = 'askldkasl';

      const user = {
        _id: 'a9892831928398',
        name: 'Sample name',
        email,
        isAdmin: true,
        familyId: 'u21u3io123ui',
      };

      UserModel.findOne.mockImplementationOnce(async () => ({
        ...user,
        password: hashedPassword,
      }));

      // when
      const result = await UserService({ UserModel, config })
        .authenticateUser(email, providedPassword);

      // then
      expect(UserModel.findOne).toBeCalledWith({ email });
      expect(result).toEqual(null);
    });
  });
});
