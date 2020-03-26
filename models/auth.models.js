const connection = require('../db/connection');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');
const bcrypt = require('bcrypt');

const authLogin = (username, password) => {
  return connection('users')
    .select('*')
    .where({ username })
    .first()
    .then(user => {
      if (!user) {
        return Promise.reject({
          status: 401,
          msg: 'invalid username or password'
        });
      } else
        return Promise.all([user, bcrypt.compare(password, user.password)]);
    })
    .then(([user, value]) => {
      if (!value) {
        return Promise.reject({
          status: 401,
          msg: 'invalid username or password'
        });
      } else {
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, iat: Date.now() },
          JWT_SECRET
        );
        return token;
      }
    });
};

const authenticationOfUser = token => {
  try {
    const verified = jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return Promise.reject({ status: 401, msg: 'nay entry' });
      else {
        payload.authorization = 'verified';
      }
      return payload;
    });
    return Promise.resolve(verified);
  } catch (err) {
    return Promise.reject({ status: 401, msg: 'nay entry' });
  }
};

module.exports = { authLogin, authenticationOfUser };
