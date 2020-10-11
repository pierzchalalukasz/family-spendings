import jwt from 'jsonwebtoken';
import { getById, authenticateUser } from './user';

describe('user controller', () => {
  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const UserService = {
    getById: jest.fn(),
    authenticateUser: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getById', () => {
    it('when user exists - returns the user', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const req = {
        params: { id },
      };
      const user = {
        id,
        name: 'Some user',
      };
      UserService.getById.mockImplementationOnce(async () => user);

      // when
      await getById({ UserService })(req, res, next);

      // then
      expect(UserService.getById).toBeCalledWith(id);
      expect(res.json).toBeCalledWith(user);
      expect(next).not.toBeCalled();
    });

    it('when user does NOT exist - returns 404', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const req = {
        params: { id },
      };
      UserService.getById.mockImplementationOnce(async () => undefined);

      // when
      await getById({ UserService })(req, res, next);

      // then
      expect(UserService.getById).toBeCalledWith(id);
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalledWith(
        expect.objectContaining({
          statusCode: 404,
          message: 'User with given id not found.',
        }),
      );
    });
  });
  describe('authenticateUser', () => {
    it('when credentials are valid - returns the user and token', async () => {
    // given
      const email = 'sampleuser@gmail.com';
      const password = 'samplepass123';
      const req = {
        body: {
          email,
          password,
        },
      };
      const user = {
        id: '5f7ceb3967bbb1004f41afca',
        name: 'Some user',
        email,
        isAdmin: true,
        familyId: '5f7ceb3967bbb1234f41afca',
      };

      const token = jwt.sign({ _id: user.id }, 'TOKEN_SECRET goes here');

      UserService.authenticateUser.mockImplementationOnce(async () => ({ user, token }));

      // when
      await authenticateUser({ UserService })(req, res, next);

      // then
      expect(UserService.authenticateUser).toBeCalledWith(email, password);
      expect(res.json).toBeCalledWith(expect.objectContaining({ user, token }));
      expect(next).not.toBeCalled();
    });

    it('when credentials are NOT valid - returns 404', async () => {
      // given
      const email = 'sampleuser@gmail.com';
      const password = 'samplepass123';
      const req = {
        body: {
          email,
          password,
        },
      };

      UserService.authenticateUser.mockImplementationOnce(async () => undefined);

      // when
      await authenticateUser({ UserService })(req, res, next);

      // then
      expect(UserService.authenticateUser).toBeCalledWith(email, password);
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalledWith(
        expect.objectContaining({
          statusCode: 404,
          message: 'User with given credentials not found.',
        }),
      );
    });
  });
});
