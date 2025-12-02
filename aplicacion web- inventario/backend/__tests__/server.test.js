const fs = require('fs');
const os = require('os');
const path = require('path');
const request = require('supertest');

describe('Inventario API', () => {
  let tmpDir;
  let dataFile;
  let app;
  let counter = 0;

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inventario-api-'));
  });

  beforeEach(() => {
    jest.resetModules();
    dataFile = path.join(tmpDir, `data-${counter++}.json`);
    if (fs.existsSync(dataFile)) fs.unlinkSync(dataFile);
    process.env.DATA_FILE = dataFile;
    app = require('../server');
  });

  afterEach(() => {
    if (fs.existsSync(dataFile)) {
      fs.unlinkSync(dataFile);
    }
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('GET /api/items returns empty array when there is no data', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/items creates a new item with normalized fields', async () => {
    const payload = { name: 'Laptop', qty: '3', price: '1999.99', desc: 'Alta gama' };
    const res = await request(app).post('/api/items').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: 'Laptop',
      qty: 3,
      price: 1999.99,
      desc: 'Alta gama'
    });
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('createdAt');

    const persisted = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    expect(persisted).toHaveLength(1);
    expect(persisted[0].name).toBe('Laptop');
  });

  test('PUT /api/items/:id updates an existing item', async () => {
    const created = await request(app).post('/api/items').send({ name: 'Mouse', qty: 1, price: 100 });
    const id = created.body.id;

    const res = await request(app)
      .put(`/api/items/${id}`)
      .send({ name: 'Mouse gamer', qty: 2, price: 150, desc: 'RGB' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id, name: 'Mouse gamer', qty: 2, price: 150, desc: 'RGB' });
  });

  test('DELETE /api/items/:id removes an item from storage', async () => {
    const created = await request(app).post('/api/items').send({ name: 'Teclado', qty: 4, price: 80 });
    const id = created.body.id;

    const delRes = await request(app).delete(`/api/items/${id}`);
    expect(delRes.status).toBe(204);

    const listRes = await request(app).get('/api/items');
    expect(listRes.body).toHaveLength(0);
  });
});
