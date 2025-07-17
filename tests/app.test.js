const request = require('supertest');
const { app, server } = require('../src/app');

describe('DevSecOps Mini Project API', () => {
  afterAll((done) => {
    server.close(done);
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('DevSecOps Mini Project API');
      expect(response.body.status).toBe('running');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body.uptime).toBeDefined();
    });
  });

  describe('POST /calculate', () => {
    it('should add two numbers', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'add', a: 5, b: 3 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(8);
    });

    it('should subtract two numbers', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'subtract', a: 10, b: 4 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(8);
    });

    it('should multiply two numbers', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'multiply', a: 3, b: 4 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(12);
    });

    it('should divide two numbers', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'divide', a: 12, b: 3 });

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(4);
    });

    it('should handle division by zero', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'divide', a: 10, b: 0 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Division by zero');
    });

    it('should handle invalid operation', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'invalid', a: 5, b: 3 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid operation');
    });

    it('should handle missing parameters', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'add', a: 5 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required parameters');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Route not found');
    });
  });
});
