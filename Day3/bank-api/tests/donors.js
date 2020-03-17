const tape = require('tape');
const superTest = require('supertest');
const app = require('./../src/app');

tape('test donors', t => {
  superTest(app)
    .get('/donors')
    .expect(200)
    .end((err, reuslt) => {
      t.equal(reuslt.body[0].name, 'donor1', 'the first doner name is doner1 ');
      t.end();
    });
});

tape('test insert donor', t => {
  superTest(app)
    .post('/donor/Add')
    .send({ name: 'donor100', bloodGroup: 'AB', phone: '00000000' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, result) => {
      t.equal(result.body, 1, 'the donor is insert in db');
      t.end();
    });
});
