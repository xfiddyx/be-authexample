const { authLogin, authenticationOfUser } = require('../models/auth.models');

const loginUser = (req, res, next) => {
  const { username, password } = req.body;
  authLogin(username, password)
    .then(result => res.status(200).send({ msg: result }))
    .catch(next);
};

const authenticateUser = (req, res, next) => {
  const { authorization } = req.headers;
  authenticationOfUser(authorization)
    .then(result => {
      if (result === 'verified') {
        next();
      }
    })
    .catch(next);
};

module.exports = { loginUser, authenticateUser };
