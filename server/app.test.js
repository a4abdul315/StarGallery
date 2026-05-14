const request = require('supertest');
const app = require('./app');

// Mock database routes to avoid needing a real DB for this sanity test
jest.mock('./routes/productRoutes', () => (req, res) => res.json([]));
jest.mock('./routes/categoryRoutes', () => (req, res) => res.json([]));

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Welcome to StarGallery API');
  });
});
