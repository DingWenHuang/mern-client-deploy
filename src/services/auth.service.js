import axios from "axios";
// const API_URL = "http://localhost:8080/api/user";
const API_URL = process.env.REACT_APP_URL + "/api/user";

class AuthService {
  // 登入功能
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  // 登出功能
  logout() {
    localStorage.removeItem("user");
  }

  // 註冊功能
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  // 抽出共用的方法
  getToken() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return token;
  }

  // 根據使用者ID更新使用者
  updateUserById(_id, username, email, password) {
    return axios.patch(
      API_URL + "/update/changeInfo/" + _id,
      { username, email, password },
      { headers: { Authorization: this.getToken() } }
    );
  }

  // 根據使用者ID更新使用者密碼
  changePassword(_id, oldPassword, newPassword) {
    return axios.patch(
      API_URL + "/update/changePassword/" + _id,
      { oldPassword, newPassword },
      { headers: { Authorization: this.getToken() } }
    );
  }

  // 取得localStorage上的使用者內容
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
