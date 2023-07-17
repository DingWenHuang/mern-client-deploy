import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const UpdatePasswordComponent = (props) => {
  let { currentUser, setCurrentUser, setIsLoading } = props;
  const navigate = useNavigate();

  let [oldpassword, setOldpassword] = useState("");
  let [newpassword1, setNewpassword1] = useState("");
  let [newpassword2, setNewpassword2] = useState("");
  let [message, setMessage] = useState("");

  const handleOldpassword = (e) => {
    setOldpassword(e.target.value);
  };
  const handleNewpassword1 = (e) => {
    setNewpassword1(e.target.value);
  };
  const handleNewpassword2 = (e) => {
    setNewpassword2(e.target.value);
  };
  const handleChangePassword = async () => {
    setIsLoading(true);
    if (newpassword1 !== newpassword2) {
      return setMessage("輸入的兩次新密碼不相符，請重新確認");
    }
    if (oldpassword == newpassword1) {
      return setMessage("您的新密碼不可與舊密碼相同");
    }
    try {
      await AuthService.changePassword(
        currentUser.user._id,
        oldpassword,
        newpassword1
      );
      setIsLoading(false);
      window.alert("密碼變更成功，請重新登入");
      AuthService.logout();
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setMessage(error.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {message && <div className="alert alert-danger">{message}</div>}
      <div>
        <div>
          <label htmlFor="oldpassword">請輸入舊密碼:</label>
          <input
            type="password"
            onChange={handleOldpassword}
            className="form-control"
            name="oldpassword"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="newpassword1">請輸入新密碼:</label>
          <input
            type="password"
            onChange={handleNewpassword1}
            className="form-control"
            name="newpassword1"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="newpassword2">請再次輸入新密碼:</label>
          <input
            type="password"
            onChange={handleNewpassword2}
            className="form-control"
            name="newpassword2"
          />
        </div>

        <br />
        <button
          onClick={handleChangePassword}
          className="btn btn-primary"
          id={currentUser.user._id}
        >
          確認修改
        </button>
      </div>
    </div>
  );
};

export default UpdatePasswordComponent;
