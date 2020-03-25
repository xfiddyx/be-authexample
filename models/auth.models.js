const connection = require('../db/connection');

const authLogin = (username, password) => {
  return connection('users')
    .select('*')
    .where({ username })
    .first()
    .then(user => {
      if (!user || password !== user.password) {
        return Promise.reject({ status: 401, msg: 'nay entry' });
      } else return 'Logged in';
    });
};

module.exports = { authLogin };
