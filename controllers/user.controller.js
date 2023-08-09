const UserService = require("../services/user.services");

class UserController {
  userService = new UserService();

  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userValid = await this.userService.signIn({ email, password });

      if (!userValid) return res.status(412).json({ message: "아이디와 비밀번호가 일치하지 않습니다." });
      else req.session.user = userValid;

      return res.status(201).json({ message: "로그인 성공" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "오류가 발생하였습니다." });
    }
  };

  signUp = async (req, res) => {
    try {
      const { email, password, name } = req.body;
      await this.userService.signUp({ email, password, name });

      return res.status(201).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "오류가 발생하였습니다." });
    }
  };
  getUserByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userService.getUserByUserId({userId});

      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "오류가 발생하였습니다." });
    }
  };
  
  editPassword = async (req, res) => {
    try {
      const { currentPassword, editPassword } = req.body;
      const { UserId } = req.session.user;
  
      await userService.editPassword(UserId, currentPassword, editPassword);
  
      req.session.destroy((err) => {
        if (err) return res.status(412).json({ message: "오류가 발생하였습니다." });
        return res.status(201).json({ message: "비밀번호가 정상 변경되어 새로운 비밀번호로 로그인이 필요합니다." });
      });
    } catch (error) {
      console.error(error);
      return res.status(412).json({ message: error.message || "오류가 발생하였습니다." });
    }
}
}
module.exports = UserController;
