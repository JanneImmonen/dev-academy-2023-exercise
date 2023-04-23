import request from 'supertest';
import app from '../src/app';

describe('Station Controller', () => {
  describe('GET /stations', () => {
    it('should get all stations', async () => {
      const res = await request(app).get('/stations');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
