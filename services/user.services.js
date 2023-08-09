require("dotenv").config();
const crypto = require("crypto");
const { SECRET_KEY } = process.env;
const UserRepository = require("../repositories/user.repository");
const { signInValidation, signUpValidation } = require("../middlewares/Validations/usersValidation");

class UserService {
  userRepository = new UserRepository();

  signIn = async ({ email, password }) => {
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");

    return this.userRepository.findByEmailAndPassword({ email, password: passwordToCrypto });
  };

  signUp = async ({ email, password, name }) => {
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");
    return this.userRepository.createUser({ email, name, passwordToCrypto });
  };

  getUserByUserId = async ({ userId }) => {
    return await this.userRepository.getUserByUserId({ userId });
  };
  async editPassword(userId, currentPassword, editPassword) {
    const currentPasswordToCrypto = crypto.pbkdf2Sync(currentPassword, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");
    const editPasswordToCrypto = crypto.pbkdf2Sync(editPassword, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");

    const currentPasswordValidation = await this.userRepository.findByUserIdAndPassword(userId, currentPasswordToCrypto);

    if (!currentPasswordValidation) {
      throw new Error("현재 비밀번호가 일치하지 않습니다.");
    }

    await this.userRepository.updatePassword(userId, editPasswordToCrypto);
  }
}

module.exports = UserService;
