const bcrypt = require('bcrypt');

const formattedUsers = users => {
  return users.map(user => {
    const newObj = { ...user };
    let encrypPassword = bcrypt.hashSync(user.password, 10);
    newObj.password = encrypPassword;
    return newObj;
  });
};

module.exports = { formattedUsers };
