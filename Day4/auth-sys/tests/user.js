const tape = require('tape');

const superTest = require('supertest');

const app = require('../src/app');

tape('test 404 , in this test we will make get request of /dammyUrl ', (t) => {
  superTest(app)
    .get('/dammyUrl')
    .expect(404)
    .end((err, result) => {
      t.equal(result.text, '404 not Found', ' Test 404 not Found Done');
      t.end();
    });
});

tape('test registration', (t) => {
  superTest(app)
    .post('/api/user/registration')
    .send({
      name: 'test111',
      email: 'dfg@nod.com',
      phone: 4564564564,
      password: '123456',
      repassword: '123456',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, result) => {
      // get data from respncse bod
      const val =
        result.body.status === 200 && result.body.data.row
          ? result.body.data.row
          : 0;
      t.equal(val, 1, 'the Registration Done');
      t.end();
    });
});

tape('test duplicate Email Validation in registration', (t) => {
  superTest(app)
    .post('/api/user/registration')
    .send({
      name: 'test111',
      email: 'dfg@nod.com',
      phone: 4564564564,
      password: '123456',
      repassword: '123456',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, result) => {
      t.equal(
        result.body.messag,
        'The Email you entered is used in system',
        'The Email you entered is used in system',
      );
      t.end();
    });
});

tape('test password length Validation in registration', (t) => {
  superTest(app)
    .post('/api/user/registration')
    .send({
      name: 'test111',
      email: 'dfg2@nod.com',
      phone: 4564564564,
      password: '1',
      repassword: '1',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, result) => {
      t.equal(
        result.body.messag,
        'Oops !  "password" with value "1" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/',
        'Oops !  "password" with value "1" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/',
      );
      t.end();
    });
});

tape('test the password not match  Validation in registration', (t) => {
  superTest(app)
    .post('/api/user/registration')
    .send({
      name: 'test111',
      email: 'dfg2@nod.com',
      phone: 4564564564,
      password: '112345',
      repassword: '112345678',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, result) => {
      t.equal(
        result.body.messag,
        'Oops ! the password not match , please re-Enter password',
        'Oops ! the password not match , please re-Enter password',
      );
      t.end();
    });
});
