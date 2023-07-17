import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const UpdateUserComponent = (props) => {
  let { currentUser, setCurrentUser, setIsLoading } = props;
  const navigate = useNavigate();

  let [username, setUsername] = useState(currentUser.user.username);
  let [email, setEmail] = useState(currentUser.user.email);
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true);
      let updateResult = await AuthService.updateUserById(
        currentUser.user._id,
        username,
        email,
        password
      );
      AuthService.logout();
      let result = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(result.data));
      setCurrentUser(AuthService.getCurrentUser());
      setIsLoading(false);
      window.alert("個人資料更新成功");
      navigate("/profile");
    } catch (error) {
      setIsLoading(false);
      setMessage(error.response.data);
    }

    // AuthService.updateUserById(currentUser.user._id, username, email)
    //   .then(() => {
    //     AuthService.logout();
    //   })
    //   .then(async () => {
    //     let result = await AuthService.login(email, password);
    //     localStorage.setItem("user", JSON.stringify(result.data));
    //   })
    //   .then(() => {
    //     setCurrentUser(AuthService.getCurrentUser());
    //     window.alert("個人資料更新成功");
    //     navigate("/profile");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setMessage(error.response.data);
    //   });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {message && <div className="alert alert-danger">{message}</div>}
      <div>
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            type="text"
            onChange={handleUsername}
            className="form-control"
            name="username"
            defaultValue={currentUser.user.username}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            type="text"
            onChange={handleEmail}
            className="form-control"
            name="email"
            defaultValue={currentUser.user.email}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">更新資料請輸入密碼做驗證：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>

        <br />
        <button
          onClick={handleUpdateUser}
          className="btn btn-primary"
          id={currentUser.user._id}
        >
          更新資料
        </button>
      </div>
    </div>
  );
};

export default UpdateUserComponent;
