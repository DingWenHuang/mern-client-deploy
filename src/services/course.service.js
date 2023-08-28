import axios from "axios";
// const API_URL = "http://localhost:8080/api/courses";
const API_URL = process.env.REACT_APP_URL + "/api/courses";

class CourseService {
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

  // 取得localStorage上的課程內容
  getCurrentCourse() {
    return JSON.parse(localStorage.getItem("currentCourse"));
  }

  // 新增課程
  createCourse(title, description, price) {
    return axios.post(
      API_URL,
      { title, description, price },
      { headers: { Authorization: this.getToken() } }
    );
  }

  // 根據講師ID取得課程
  getCoursesByInstructorId(_id) {
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

  // 根據學生ID取得課程
  getCoursesByStudentId(_id) {
    return axios.get(API_URL + "/student/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

  // 根據課程名稱取得課程
  getCourseByName(name, sort) {
    if (name.trim() === "") {
      return axios.get(API_URL + "/" + "?sort=" + sort, {
        headers: { Authorization: this.getToken() },
      });
    } else {
      return axios.get(API_URL + "/findByName/" + name + "?sort=" + sort, {
        headers: { Authorization: this.getToken() },
      });
    }
  }

  // 根據課程ID取得課程
  getCourseById(_id) {
    return axios.get(API_URL + "/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

  // 根據課程ID註冊課程
  enroll(_id) {
    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: { Authorization: this.getToken() },
      }
    );
  }

  // 根據課程ID更新課程
  updateCourseById(_id, title, description, price) {
    return axios.patch(
      API_URL + "/" + _id,
      { title, description, price },
      { headers: { Authorization: this.getToken() } }
    );
  }

  // 根據課程ID刪除課程
  deleteCourseById(_id) {
    return axios.delete(API_URL + "/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

  // 根據課程ID退選課程
  dropCourseById(_id) {
    return axios.patch(
      API_URL + "/drop/" + _id,
      {},
      {
        headers: { Authorization: this.getToken() },
      }
    );
  }
}

export default new CourseService();
