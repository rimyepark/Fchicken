require("dotenv").config();
const crypto = require("crypto");
const { SECRET_KEY } = process.env;
const UserRepository = require("../repositories/user.repository");
const { signInValidation, signUpValidation, editPasswordValidation } = require("../middlewares/Validations/usersValidation");
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

  getUserByUserId = async ({ UserId }) => {
    return await this.userRepository.getUser({ UserId });
  };

  editPassword = async ({ UserId, currentPassword, editPassword  }) => {
    const currentPasswordToCrypto = crypto.pbkdf2Sync(currentPassword, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");
    const editPasswordToCrypto = crypto.pbkdf2Sync(editPassword, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");

    const currentPasswordValidation = await this.userRepository.getUser({ UserId, currentPasswordToCrypto });

    if (!currentPasswordValidation) {
      throw new Error("현재 비밀번호가 일치하지 않습니다.");
    }

   return await this.userRepository.updatePassword({ UserId: UserId }, { password:editPasswordToCrypto });
  };
}

module.exports = UserService;
