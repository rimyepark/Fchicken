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

  getUserByUserId = async (taget) => {
    return await Users.findOne(taget);
  };

  updatePassword = async (taget, { editPassword }) => {
    return await Users.update({ password: editPassword }, { where: { [Op.and]: taget } });
  };
}

module.exports = UserRepository;
