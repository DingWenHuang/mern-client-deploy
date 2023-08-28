import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = (props) => {
  let {
    currentUser,
    setCurrentUser,
    currentCourse,
    setCurrentCourse,
    setIsLoading,
  } = props;
  const navigate = useNavigate();

  let [courseData, setCourseData] = useState(null);
  let [message, setMessage] = useState("");

  // 更新課程
  const handleUpdate = async (e) => {
    try {
      setIsLoading(true);
      let result = await CourseService.getCourseById(e.target.id);
      setIsLoading(false);
      localStorage.setItem("currentCourse", JSON.stringify(result.data));
      setCurrentCourse(CourseService.getCurrentCourse());
      navigate("/course/update");
    } catch (error) {
      setIsLoading(false);
      setMessage(error.response.data);
    }
  };

  // 刪除課程
  const handleDelete = async (e) => {
    let confirmDelete = window.confirm("確定要刪除該課程?");

    if (!confirmDelete) {
      return;
    }

    try {
      setIsLoading(true);
      await CourseService.deleteCourseById(e.target.id);
      setIsLoading(false);
      window.alert("課程已刪除成功");
      navigate(0);
    } catch (error) {
      setIsLoading(false);
      setMessage(error.response.data);
    }
  };

  // 退選課程
  const handleDrop = async (e) => {
    let confirmDrop = window.confirm("確定要退選該課程?");

    if (!confirmDrop) {
      return;
    }

    try {
      setIsLoading(true);
      await CourseService.dropCourseById(e.target.id);
      setIsLoading(false);
      window.alert("課程已退選成功");
      navigate(0);
    } catch (error) {
      setIsLoading(false);
      setMessage(error.response.data);
    }
  };

  // 在進入頁面時，確認使用者身分，並取得課程資料
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role === "instructor") {
        setIsLoading(true);
        CourseService.getCoursesByInstructorId(_id)
          .then((data) => {
            setIsLoading(false);
            setCourseData(data.data);
          })
          .catch((e) => {
            setIsLoading(false);
            console.log(e);
          });
      } else if (currentUser.user.role === "student") {
        setIsLoading(true);
        CourseService.getCoursesByStudentId(_id)
          .then((data) => {
            setIsLoading(false);
            setCourseData(data.data);
          })
          .catch((e) => {
            setIsLoading(false);
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {message && <div className="alert alert-danger">{message}</div>}
      {/* 若沒登入則提供導向回登入頁面的按鈕 */}
      {!currentUser && (
        <div>
          <h5>在查看課程之前，您必須先登錄。</h5>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            回到登入頁面
          </button>
        </div>
      )}
      <div className="d-flex justify-content-center">
        {currentUser && currentUser.user.role === "student" && (
          <div>
            <h1>歡迎來到學生的課程頁面</h1>
          </div>
        )}
        {currentUser && currentUser.user.role === "instructor" && (
          <div>
            <h1>歡迎來到講師的課程頁面</h1>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center">
        {/* 顯示講師的課程 */}
        {currentUser &&
          currentUser.user.role === "instructor" &&
          courseData &&
          courseData.length != 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {courseData.map((course, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    style={{ width: "18rem", margin: "1rem" }}
                  >
                    <div className="card-body">
                      <h5>課程名稱：{course.title}</h5>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程敘述：{course.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程人數：{course.students.length}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程價格：{course.price}
                      </p>
                      <div
                        className="buttons"
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <a
                          href="#"
                          className="card-text btn btn-primary"
                          onClick={handleUpdate}
                          id={course._id}
                        >
                          更新課程
                        </a>
                        <a
                          href="#"
                          className="card-text btn btn-danger"
                          onClick={handleDelete}
                          id={course._id}
                        >
                          刪除課程
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        {/* 顯示學生的課程 */}
        {currentUser &&
          currentUser.user.role === "student" &&
          courseData &&
          courseData.length != 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {courseData.map((course, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    style={{ width: "18rem", margin: "1rem" }}
                  >
                    <div className="card-body">
                      <h5>課程名稱：{course.title}</h5>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程敘述：{course.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程人數：{course.students.length}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程價格：{course.price}
                      </p>
                      <div
                        className="buttons"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <a
                          href="#"
                          className="card-text btn btn-primary"
                          onClick={handleDrop}
                          id={course._id}
                        >
                          退選課程
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
};

export default CourseComponent;
