import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterComponent = (props) => {
  let { isLoading, setIsLoading } = props;
  const navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
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
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  // 註冊
  const handleRegister = async () => {
    try {
      setIsLoading(true);
      await AuthService.register(username, email, password, role);
      setIsLoading(false);
      window.alert("註冊成功，將導向至登入頁面");
      navigate("/login");
    } catch (e) {
      setIsLoading(false);
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {/* 如果有發生錯誤顯示錯誤訊息 */}
      {message && <div className="alert alert-danger">{message}</div>}

      <div>
        {/* 產生註冊帳號表單與註冊按鈕 */}
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            type="text"
            onChange={handleUsername}
            className="form-control"
            name="username"
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
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            type="password"
            onChange={handlePassword}
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">身份：</label>

          <select
            onChange={handleRole}
            className="form-control"
            style={{ width: "5rem", textAlign: "center" }}
          >
            <option value=""></option>
            <option value="student">學生</option>
            <option value="instructor">講師</option>
          </select>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
