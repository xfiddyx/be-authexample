const connection = require('../db/connection');

exports.revealSecrets = (req, res, next) => {
  const { username } = req.user;
  connection('secrets')
    .select('secrets.*', 'users.username')
    .join('users', 'users.user_id', '=', 'secrets.user_id')
    .where('users.username', username)
    .then(secrets => {
      res.send({ secrets });
    });
};
