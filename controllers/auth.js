const { authLogin } = require('../models/auth.models');

const loginUser = (req, res, next) => {
  const { username, password } = req.body;
  authLogin(username, password)
    .then(result => res.status(200).send({ msg: result }))
    .catch(next);
};

module.exports = { loginUser };
