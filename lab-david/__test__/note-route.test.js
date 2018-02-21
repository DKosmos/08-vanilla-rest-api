'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Note Routes', () => {
  var car = null;

  describe('POST: /api/car', () => {
    it('should return a car', (done) => {
      request.post('localhost:3000/api/car').send({
        make: 'test make',
        model: 'test model',
        year: 1983,
      }).end((err,res) => {
        if(err) return done(err);
        car = JSON.parse(res.text);
        expect(res.status).toEqual(200);
        expect(car.make).toEqual('test make');
        expect(car.model).toEqual('test model');
        expect(car.year).toBe(1983);
        done();
      });
    });
  });

  describe('GET: /api/car', () => {
    it('should return a car', (done) => {
      request.get(`localhost:3000/api/car?id=${car.id}`).end((err,res) => {
        if(err) return done(err);
        expect(res.status).toEqual(200);
        expect(car.make).toEqual('test make');
        expect(car.model).toEqual('test model');
        expect(car.year).toBe(1983);
        done();
      });
    });
  });
});