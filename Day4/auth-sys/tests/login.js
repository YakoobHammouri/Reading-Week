const tape = require('tape');

const superTest = require('supertest');

const app = require('../src/app');

tape('test login', (t) => {
  superTest(app)
    .post('/auth/user/login')
    .send({
      email: 'dfg@nod.com',
      password: '123456',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, result) => {
      const val =
        result.body.status === 200 && result.body.data.row
          ? result.body.data.row
          : 0;
      t.equal(val, 1, 'the Log in Done');
      t.end();
    });
});
