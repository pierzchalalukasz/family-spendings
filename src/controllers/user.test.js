import { getById } from './user';

describe('user controller', () => {
  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const UserService = {
    getById: jest.fn(),
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
});
