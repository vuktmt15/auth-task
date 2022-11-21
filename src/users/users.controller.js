const admin = require("firebase-admin");
const auth = require("../auth/auth.controller");

class UserController {
  async createUserByEmail(data) {
    const userResponse = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      emailVerified: false,
      disabled: false,
    });
    return userResponse;
  }

  async getUserByEmail(email) {
    const user = await admin.auth().getUserByEmail(email);
    return user;
  }

  async updateUser(uid, properties) {
    return await admin.auth().updateUser(uid, properties);
  }
}

module.exports = new UserController();
