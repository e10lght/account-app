const { client } = require('../../db/connect');
const IncomeModel = require('../../models/Income'); // あなたのモデルへのパスを確認してください。

jest.mock('../../db/connect', () => ({
  client: {
    query: jest.fn(),
  },
}));

describe('Income model tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call findAll and return data', async () => {
    const mockData = [
      { id: 1, income_title: 'Test' /* 他のフィールドも追加する */ },
    ];
    client.query.mockResolvedValue({ rows: mockData });

    const data = await IncomeModel.findAll();

    expect(client.query).toHaveBeenCalled();
    expect(data).toEqual(mockData);
  });

  // 他のメソッドに対しても同様のテストを追加します。
});
