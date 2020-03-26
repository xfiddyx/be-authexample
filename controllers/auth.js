const { authLogin, authenticationOfUser } = require('../models/auth.models');

const loginUser = (req, res, next) => {
  const { username, password } = req.body;
  authLogin(username, password)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(next);
};

const authenticateUser = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  authenticationOfUser(token)
    .then(payload => {
      if (payload.authorization === 'verified') {
        req.query = payload;
        next();
      }
    })
    .catch(next);
};

module.exports = { loginUser, authenticateUser };
