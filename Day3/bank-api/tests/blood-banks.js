const tape = require('tape');
const superTest = require('supertest');
const app = require('./../src/app');

tape('test blood banks', t => {
  superTest(app)
    .get('/bloodBanks')
    .expect()
    .end((err, result) => {
      t.equal(
        result.body[0].bankname,
        'bloodBank1',
        'the first blood bank is bloodBank1'
      );
      t.end();
    });
});

tape('test insert blood-Bank', t => {
  superTest(app)
    .post('/bloodBank/Add')
    .send({ name: 'donor100', city: 'city1000', phone: '00000000', donerId: 1 })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, result) => {
      t.equal(result.body, 1, 'the blood-Bank is insert in db');
      t.end();
    });
});
