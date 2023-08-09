const { Users, sequelize } = require("../models");

class UserRepository {
  findByEmailAndPassword = async ({ email, password }) => {
    return await Users.findOne({
      where: { email, password },
      attributes: { exclude: ["password"] },
    });
  };

  createUser = async ({email, name, passwordToCrypto}) => {
    return await Users.create({ email, name, password: passwordToCrypto, isEmailValid: false });
  };

  getUserByUserId = async ({userId}) => {
    return await Users.findOne({ where: { userId } });
  };
  async findByUserIdAndPassword(userId, password) {
    return await Users.findOne({ where: { userId, password } });
  }

  async updatePassword(userId, newPassword) {
    return await Users.update({ password: newPassword }, { where: { userId } });
  }
}

module.exports = UserRepository;
