import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import loadingImg from "../images/loading.gif";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser, isLoading, setIsLoading } = props;

  return (
    <div>
      {/* 顯示載入中的圖示，避免使用者在等待時不知道發生了什麼事情 */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            height: " 100%",
            width: "100%",
            top: "0",
            left: "0",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: "20",
          }}
        >
          <img
            style={{
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "150px",
              height: "150px",
            }}
            src={loadingImg}
            alt="載入中..."
          />
        </div>
      )}

      {/* 導覽列根據使用者是否登入以及不同身分顯示不同的選項 */}
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    首頁
                  </Link>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      註冊會員
                    </Link>
                  </li>
                )}

                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      會員登入
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link
                      onClick={() => {
                        authService.logout();
                        setCurrentUser(null);
                      }}
                      className="nav-link"
                      to="/"
                    >
                      登出
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      個人頁面
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/course">
                      課程頁面
                    </Link>
                  </li>
                )}

                {currentUser && currentUser.user.role === "instructor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/postCourse">
                      新增課程
                    </Link>
                  </li>
                )}

                {currentUser && currentUser.user.role === "student" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/enroll">
                      搜尋課程
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
