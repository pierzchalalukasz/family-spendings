import { getById, getBudgetByFamilyId } from './family';

describe('family controller', () => {
  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const FamilyService = {
    getById: jest.fn(),
    getBudgetByFamilyId: jest.fn(),
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
      };
      FamilyService.getById.mockImplementationOnce(async () => family);

      // when
      await getById({ FamilyService })(req, res, next);

      // then
      expect(FamilyService.getById).toBeCalledWith(id);
      expect(res.json).toBeCalledWith(family);
      expect(next).not.toBeCalled();
    });

    it('when family does NOT exist - returns 404', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const req = {
        params: { id },
      };
      FamilyService.getById.mockImplementationOnce(async () => undefined);

      // when
      await getById({ FamilyService })(req, res, next);

      // then
      expect(FamilyService.getById).toBeCalledWith(id);
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalledWith(
        expect.objectContaining({
          statusCode: 404,
          message: 'Family with given id not found.',
        }),
      );
    });
  });

  describe('getBudgetByFamilyId', () => {
    it('when family exists - returns the family budget', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const budget = 0;
      const req = {
        params: { id },
      };

      const family = {
        id,
        name: 'Some family',
        budget,
      };

      FamilyService.getById.mockImplementationOnce(async () => family);

      // when
      await getBudgetByFamilyId({ FamilyService })(req, res, next);

      // then
      expect(FamilyService.getById).toBeCalledWith(id);
      expect(res.json).toBeCalledWith(budget);
      expect(next).not.toBeCalled();
    });

    it('when family does NOT exist - returns 404', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const req = {
        params: { id },
      };
      FamilyService.getBudgetByFamilyId.mockImplementationOnce(async () => undefined);

      // when
      await getBudgetByFamilyId({ FamilyService })(req, res, next);

      // then
      expect(FamilyService.getById).toBeCalledWith(id);
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalledWith(
        expect.objectContaining({
          statusCode: 404,
          message: 'Family with given id not found.',
        }),
      );
    });
  });
});
