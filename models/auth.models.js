const connection = require('../db/connection');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');

const authLogin = (username, password) => {
  return connection('users')
    .select('*')
    .where({ username })
    .first()
    .then(user => {
      if (!user || password !== user.password) {
        return Promise.reject({ status: 401, msg: 'nay entry' });
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            iat: Date.now()
          },
          JWT_SECRET
        );
        return token;
      }
    });
};

const authenticationOfUser = authorization => {
  const token = authorization.split(' ')[1];
  const verified = jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return Promise.reject({ status: 401, msg: 'nay entry' });
    else return 'verified';
  });
  return Promise.resolve(verified);
};

module.exports = { authLogin, authenticationOfUser };
