import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser, setIsLoading } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  let [sort, setSort] = useState("date-desc");

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSorting = (e) => {
    setSort(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      let result = await CourseService.getCourseByName(searchInput, sort);
      setIsLoading(false);
      setSearchResult(result.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleEnroll = async (e) => {
    try {
      setIsLoading(true);
      let result = await CourseService.enroll(e.target.id);
      setIsLoading(false);
      window.alert("課程註冊成功。重新導向到課程頁面。");
      navigate("/course");
    } catch (e) {
      setIsLoading(false);
      if (e.response.data) {
        window.alert(e.response.data);
      } else {
        console.log(e);
      }
    }
  };

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  useEffect(() => {
    handleSearch();
  }, [sort, searchInput]);

  // useEffect(() => {
  //   handleSearch();
  // }, [searchInput]);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能夠搜尋課程</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生才能夠註冊新課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>符合條件的課程清單</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h5 style={{ margin: "1rem" }}>排序方式</h5>
              <select
                className="form-control"
                onChange={handleSorting}
                style={{ width: "15rem", textAlign: "center" }}
              >
                <option value="date-desc">上架時間：由新到舊</option>
                <option value="date-asc">上架時間：由舊到新</option>
                <option value="students-desc">學生人數：由多到少</option>
                <option value="students-asc">學生人數：由少到多</option>
                <option value="price-desc">課程費用：由高到低</option>
                <option value="price-asc">課程費用：由低到高</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {searchResult.map((course) => (
              <div
                key={course._id}
                className="card"
                style={{ width: "18rem", margin: "0.5rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">課程名稱：{course.title}</h5>
                  <p className="card-text">課程敘述：{course.description}</p>
                  <p className="card-text">價格: {course.price}</p>
                  <p className="card-text">
                    講師: {course.instructor.username}
                  </p>
                  <p className="card-text">
                    目前的學生人數: {course.students.length}
                  </p>
                  <a
                    href="#"
                    onClick={handleEnroll}
                    className="card-text btn btn-primary"
                    id={course._id}
                  >
                    註冊課程
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
