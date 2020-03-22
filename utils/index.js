const bcrypt = require('bcrypt');

exports.formatUsers = rawUsers => {
  return rawUsers.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10)
  }));
};
