const server = require('../server');
const request = require('supertest');
const expect = require('expect.js');

describe('Endpoints Testing', () => {

  describe('/GET /summary', () => {
    it('It should GET all summary data', async () => {
      const res = await request(server)
        .get('/summary')
        .set('Accept', 'application/json');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('/GET /summary/latest', () => {
    it('It should GET latest summary data', async () => {
      const res = await request(server)
        .get('/summary/latest')
        .set('Accept', 'application/json');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('/GET /countries', () => {
    it('It should GET all countries data', async () => {
      const res = await request(server)
        .get('/countries')
        .set('Accept', 'application/json');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('/GET /countries/:country', () => {
    it('It should GET a country data', async () => {
      const res = await request(server)
        .get('/countries/us')
        .set('Accept', 'application/json');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('object');
    });
    it('It should NOT GET a country data if not exist', async () => {
      const res = await request(server)
        .get('/countries/asd')
        .set('Accept', 'application/json');
      expect(res.status).to.eql(404);
    });
  });

  describe('/GET /countries/:country/latest', () => {
    it('It should GET a latest country data', async () => {
      const res = await request(server)
        .get('/countries/us/latest')
        .set('Accept', 'application/json');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('object');
    });
    it('It should NOT GET a latest country data if not exist', async () => {
      const res = await request(server)
        .get('/countries/asd/latest')
        .set('Accept', 'application/json');
      expect(res.status).to.eql(404);
    });
  });

  describe('/GET /country', () => {
    it('It should GET a list of available country', async () => {
      const res = await request(server)
        .get('/country')
        .set('Accept', 'application/json');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('array');
    });
  });

});