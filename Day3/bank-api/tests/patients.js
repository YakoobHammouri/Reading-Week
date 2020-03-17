const tape = require('tape');
const supertest = require('supertest');
const app = require('../src/app');

tape('test get patient', t => {
  supertest(app)
    .get('/patients')
    .expect(200)
    .end((err, result) => {
      t.equal(
        result.body[0].name,
        'patient1',
        'the name of fisrt patient is patient1'
      );
      t.end();
    });
});

tape('test insert patient', t => {
  supertest(app)
    .post('/patient/Add')
    .send({ name: 'patient100', bloodGroup: 'AB' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, result) => {
      t.equal(result.body, 1, 'the patient is insert in db');
      t.end();
    });
});
