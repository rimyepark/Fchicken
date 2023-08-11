const { Users, sequelize } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  findByEmailAndPassword = async ({ email, password }) => {
    return await Users.findOne({
      where: { email, password },
      attributes: { exclude: ["password"] },
    });
  };

  createUser = async ({ email, name, passwordToCrypto }) => {
    return await Users.create({ email, name, password: passwordToCrypto, isEmailValid: false });
  };

  getUser = async (target) => {
    return await Users.findOne(target);
  };

  updatePassword = async (target, data) => {
    return await Users.update(data, { where: { [Op.and]: target } });
  };
}

module.exports = UserRepository;
