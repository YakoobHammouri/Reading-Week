const tape = require('tape');

const superTest = require('supertest');

const app = require('./../src/app');

tape('test registration', t => {
  superTest(app)
    .post('/api/user/registration')
    .send({
      name: 'test111',
      email: 'dfg@nod.com',
      phone: 4564564564,
      password: '123456'
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, result) => {
      // get data from respncse body
      const val =
        result.body.status === 200 && result.body.data.row
          ? result.body.data.row
          : 0;
      t.equal(val, 1, 'the Registration done');
      t.end();
    });
});
