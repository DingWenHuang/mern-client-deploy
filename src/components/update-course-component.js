import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const UpdateCourseComponent = (props) => {
  let {
    currentUser,
    setCurrentUser,
    currentCourse,
    setCurrentCourse,
    setIsLoading,
  } = props;
  let [title, setTitle] = useState(currentCourse.title);
  let [description, setDescription] = useState(currentCourse.description);
  let [price, setPrice] = useState(currentCourse.price);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  // 更新課程
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await CourseService.updateCourseById(
        currentCourse._id,
        title,
        description,
        price
      );
      setIsLoading(false);
      localStorage.removeItem("currentCourse");
      window.alert("課程更新成功");
      navigate("/course");
    } catch (error) {
      setIsLoading(false);
      setMessage(error.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>在更新課程之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}

      {/* 確認使用者是講師才能更新課程 */}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <p>只有講師可以更新課程。</p>
        </div>
      )}

      {/* 提供講師更新課程的表與更新按鈕，預先帶入原先的課程資料 */}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <label htmlFor="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
            defaultValue={currentCourse.title}
          />
          <br />
          <label htmlFor="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
            defaultValue={currentCourse.description}
          />
          <br />
          <label htmlFor="exampleforPrice">價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
            defaultValue={currentCourse.price}
          />
          <br />
          <button onClick={handleUpdate} className="btn btn-primary">
            確認更新
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateCourseComponent;
