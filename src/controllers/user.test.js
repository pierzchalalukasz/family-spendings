import { getById } from './user';

describe('user controller', () => {
  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  const UserModel = {
    findById: jest.fn(),
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
      UserModel.findById.mockImplementationOnce(async () => user);

      // when
      await getById({ UserModel })(req, res);

      // then
      expect(UserModel.findById).toBeCalledWith(id);
      expect(res.json).toBeCalledWith(user);
      expect(res.send).not.toBeCalledWith(404);
    });

    it('when user does NOT exist - returns 404', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const req = {
        params: { id },
      };
      UserModel.findById.mockImplementationOnce(async () => undefined);

      // when
      await getById({ UserModel })(req, res);

      // then
      expect(UserModel.findById).toBeCalledWith(id);
      expect(res.send).toBeCalledWith(404);
      expect(res.json).not.toBeCalled();
    });
  });
});
