import request from 'supertest';
import app from '../src/app';

describe('Journey Controller', () => {
  it('should get all journeys', async () => {
    const res = await request(app).get('/journeys');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
