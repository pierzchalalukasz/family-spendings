import { getById } from './family';

describe('family controller', () => {
  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  const FamilyModel = {
    findById: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getById', () => {
    it('when family exists - returns the family', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const req = {
        params: { id },
      };
      const family = {
        id,
        name: 'Some family',
        members: ['5f7ceb3967bbb1004f41afcd'],
      };
      FamilyModel.findById.mockImplementationOnce(async () => family);

      // when
      await getById({ FamilyModel })(req, res);

      // then
      expect(FamilyModel.findById).toBeCalledWith(id);
      expect(res.json).toBeCalledWith(family);
      expect(res.send).not.toBeCalledWith(404);
    });

    it('when family does NOT exist - returns 404', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const req = {
        params: { id },
      };
      FamilyModel.findById.mockImplementationOnce(async () => undefined);

      // when
      await getById({ FamilyModel })(req, res);

      // then
      expect(FamilyModel.findById).toBeCalledWith(id);
      expect(res.send).toBeCalledWith(404);
      expect(res.json).not.toBeCalled();
    });
  });
});
