const request = require("supertest");
const mysql = require("mysql");

jest.mock("mysql");

const mockConnection = {
  query: jest.fn(),
  connect: jest.fn((cb) => cb && cb()),
};

mysql.createConnection.mockReturnValue(mockConnection);

const app = require("./indeks");

beforeEach(() => {
  mockConnection.query.mockClear();
});

describe("POST /api/set-budget", () => {
  test("uspješno postavljanje budžeta", async () => {
    mockConnection.query.mockImplementationOnce((sql, params, cb) => cb(null));

    const response = await request(app)
      .post("/api/set-budget")
      .send({ userId: 1, iznos: 5000 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Budžet uspješno postavljen" });
    expect(mockConnection.query).toHaveBeenCalledWith(
      expect.any(String),
      [1, 5000, expect.any(Number), expect.any(Number)],
      expect.any(Function)
    );
  });

  test("greska kod baze", async () => {
    mockConnection.query.mockImplementationOnce((sql, params, cb) =>
      cb(new Error("DB error"))
    );

    const response = await request(app)
      .post("/api/set-budget")
      .send({ userId: 1, iznos: 5000 });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Greška kod postavljanja budžeta" });
  });
});

describe("GET /api/budget/:userId", () => {
  test("dohvati budžet", async () => {
    mockConnection.query.mockImplementationOnce((sql, params, cb) =>
      cb(null, [{ ukupanBudzet: 5000, ukupniRashod: 2000 }])
    );

    const response = await request(app).get("/api/budget/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ukupanBudzet: 5000, ostalibudzet: 3000 });
  });

  test("greska kod baze", async () => {
    mockConnection.query.mockImplementationOnce((sql, params, cb) =>
      cb(new Error("DB error"))
    );

    const response = await request(app).get("/api/budget/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Greška na serveru" });
  });
});
