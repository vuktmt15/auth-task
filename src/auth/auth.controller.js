const auth = require("./auth.config");
const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  linkWithCredential,
  EmailAuthProvider,
} = require("firebase/auth");
const UserController = require("../users/users.controller");
const sendOtpMail = require("../mail/sendOTPMail");

class AuthController {
  async register(req, res) {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        req.body.email,
        req.body.password
      );
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += Math.floor(Math.random() * 10).toString();
      }

      await sendOtpMail(req.body.email, OTP);
      res.cookie(
        "otp-verify",
        { otp: OTP, email: req.body.email },
        { maxAge: 1000 * 60 * 30 }
      );

      return res.status(201).json({ newUser: newUser });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        req.body.email,
        req.body.password
      );
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async verifyOtp(req, res) {
    const { email, otp } = req.body;
    const user = await UserController.getUserByEmail(email);

    if (req.cookies["otp-verify"]["email"] != email) {
      return res.status(403).json({ message: "Forrbiden" });
    }
    if (req.cookies["otp-verify"]["otp"] == otp) {
      await UserController.updateUser(user.uid, { emailVerified: true });
      return res.status(200).json({ message: "Verified account is success!" });
    }
  }

  async requestForgotPassword(req, res) {
    const { email } = req.body;
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += Math.floor(Math.random() * 10).toString();
    }

    await sendOtpMail(email, OTP);
    res.cookie(
      "otp-forgot",
      { otp: OTP, email: email },
      { maxAge: 1000 * 60 * 30 }
    );

    return res
      .status(200)
      .json({ message: "Please check email to receive OTP forgot password!" });
  }

  async createNewPassword(req, res) {
    const { otp, newPassword } = req.body;
    const user = await UserController.getUserByEmail(
      req.cookies["otp-forgot"]["email"]
    );
    if (req.cookies["otp-forgot"]["otp"] != otp) {
      return res.status(400).json({ message: "OTP is valid!" });
    }
    await UserController.updateUser(user.uid, { password: newPassword });
    return res
      .status(200)
      .json({ message: "Created new password!", newPassword });
  }
}

module.exports = new AuthController();
