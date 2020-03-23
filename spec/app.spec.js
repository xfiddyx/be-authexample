const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => connection.destroy());

  describe('/login', () => {
    it('POST responds with an access token given correct username and password', () =>
      request
        .post('/api/login')
        .send({ username: 'mitch', password: 'secure123' })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.have.ownProperty('token');
        }));
    it('POST responds with status 401 for an incorrect password', () =>
      request
        .post('/api/login')
        .send({ username: 'mitch', password: 'wrongpassword' })
        .expect(401)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('invalid username or password');
        }));
    it('POST responds with status 401 for an incorrect username', () =>
      request
        .post('/api/login')
        .send({ username: 'paul', password: 'secure123' })
        .expect(401)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('invalid username or password');
        }));
  });

  describe('/secrets', () => {
    it('Responds with an array of secrets', () =>
      request
        .get('/api/secrets')
        .expect(200)
        .then(({ body: { secrets } }) => {
          expect(secrets).to.be.an('Array');
          expect(secrets[0]).to.contain.all.keys(
            'secret_id',
            'secret_text',
            'user_id'
          );
        }));
  });
});
