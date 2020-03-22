const connection = require('../db/connection');

exports.revealSecrets = (req, res, next) => {
  connection('secrets')
    .select('secrets.*', 'users.username')
    .join('users', 'users.user_id', '=', 'secrets.user_id')
    .then(secrets => {
      res.send({ secrets });
    });
};
