const IncomeController = require('../../controllers/Income');
const IncomeModel = require('../../models/Income');

jest.mock('../../models/Income');

describe('Income controller tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('収入データの全取得', async () => {
    const mockData = [
      {
        id: 1,
        income_title: 'Test',
        income_category_id: 1,
        income_amount: 99999,
        income_recieved_date: '2023-06-24T00:00:00.000Z',
        user_id: 1,
      },
    ];
    // IncomeModel.findAll関数がテスト内で呼び出されるたびに、
    // 実際のfindAll関数を実行せず、定義したresを返すようにする
    IncomeModel.findAll.mockResolvedValue(mockData);

    // モデル側での呼び出しでエラーを返すようにする（引数に返したい値を渡せば良い）
    // const mockError = new Error('Database connection failed');
    // IncomeModel.findAll.mockRejectedValue(mockError);

    const req = {};
    const res = {
      status: jest.fn(function () {
        return this;
      }),
      json: jest.fn(),
    };

    // テスト内でgetIncomeAllData関数が呼び出されると、
    // 実際のHTTPリクエストを処理する際にExpress.jsが渡すreqオブジェクトと
    //resオブジェクトの代わりに、これらのモック・オブジェクトが使用されます。
    await IncomeController.getIncomeAllData(req, res);

    expect(IncomeModel.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('収入データを月ごとに取得', async () => {
    const mockData = [
      {
        id: 1,
        income_title: 'Test',
        income_category_id: 1,
        income_amount: 99999,
        income_recieved_date: '2023-06-24T00:00:00.000Z',
        user_id: 1,
      },
    ];
    IncomeModel.findMonthly.mockResolvedValue(mockData);

    const req = {
      params: {
        date: '2023-06-27',
      },
    };
    const res = {
      status: jest.fn(function () {
        return this;
      }),
      json: jest.fn(),
    };

    await IncomeController.getIncomeMonthlyData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
  it('収入データを追加', async () => {
    // IncomeModel.createRecordsをモック関数にし、それが正常に解決するようにします
    IncomeModel.createRecords.mockResolvedValue();

    const req = {
      body: {
        data: [
          {
            incomeTitle: 'Salary',
            incomeCategoryId: 1,
            incomeAmount: 5000,
            recievedDate: '2023-06-27',
            userId: 1,
          },
        ],
      },
    };
    const res = {
      status: jest.fn(function () {
        return this;
      }),
      json: jest.fn(),
    };

    await IncomeController.addIncomeData(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: '追加に成功しました' });
  });
  it('収入データを更新', async () => {
    // IncomeModel.createRecordsをモック関数にし、それが正常に解決するようにします
    IncomeModel.update.mockResolvedValue();

    const req = {
      body: {
        id: 1,
        amount: 99999,
      },
    };
    const res = {
      status: jest.fn(function () {
        return this;
      }),
      json: jest.fn(),
    };

    await IncomeController.modifyIncomeData(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: '更新に成功しました' });
  });
  it('収入データを削除', async () => {
    IncomeModel.delete.mockResolvedValue();

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: jest.fn(function () {
        return this;
      }),
      json: jest.fn(),
    };

    await IncomeController.removeIncomeData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: '削除に成功しました' });
  });
});
