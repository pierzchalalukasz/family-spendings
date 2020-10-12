import FamilyService from './family';

describe('family service', () => {
  const FamilyModel = {
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getById', () => {
    it('when family with given id exists - returns the family', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';

      const family = {
        id,
        name: 'Some name',
        budget: 0,
      };

      FamilyModel.findById.mockImplementationOnce(async () => family);

      // when
      const result = await FamilyService({ FamilyModel }).getById(id);

      // then
      expect(FamilyModel.findById).toBeCalledWith(id);
      expect(result).toEqual(family);
    });
  });

  describe('createFamily', () => {
    it('creates a family with given name - returns the family', async () => {
      // given
      const id = '5f7ceb3967bbb1004f41afca';
      const name = 'Some name';

      const family = {
        id,
        name,
        budget: 0,
      };

      FamilyModel.create.mockImplementationOnce(async () => family);

      // when
      const result = await FamilyService({ FamilyModel }).createFamily(name);

      // then
      expect(FamilyModel.create).toBeCalledWith({ name });
      expect(result).toEqual(family);
    });
  });

  describe('updateBudget', () => {
    it('updates a family with given id and sets new budget value - returns the family', async () => {
      // given
      // eslint-disable-next-line no-underscore-dangle
      const _id = '5f7ceb3967bbb1004f41afca';
      const budget = 250;

      const family = {
        _id,
        name: 'Some name',
        budget,
      };

      FamilyModel.updateOne.mockImplementationOnce(async () => family);

      // when
      const result = await FamilyService({ FamilyModel }).updateBudget(_id, budget);

      // then
      expect(FamilyModel.updateOne).toBeCalledWith({ _id }, { $set: { budget } });
      expect(result).toEqual(family);
    });
  });
});
