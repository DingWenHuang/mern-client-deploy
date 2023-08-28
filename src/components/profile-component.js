import { useNavigate } from "react-router-dom";

const ProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}

      {/* 登入後顯示個人資料 */}
      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "15rem",
            }}
          >
            <a
              href="#"
              onClick={() => {
                navigate("/profile/update");
              }}
              className="btn btn-primary"
              id={currentUser.user._id}
            >
              更新個人資料
            </a>
            <a
              href="#"
              onClick={() => {
                navigate("/profile/changepassword");
              }}
              className="btn btn-primary"
              id={currentUser.user._id}
            >
              變更密碼
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
