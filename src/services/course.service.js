import axios from "axios";
// const API_URL = "http://localhost:8080/api/courses";
const API_URL = "https://mern-practice-server.onrender.com/api/courses";

class CourseService {
  getToken() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return token;
  }

  getCurrentCourse() {
    return JSON.parse(localStorage.getItem("currentCourse"));
  }

  post(title, description, price) {
    return axios.post(
      API_URL,
      { title, description, price },
      { headers: { Authorization: this.getToken() } }
    );
  }

  getCoursesByInstructorId(_id) {
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

  getCoursesByStudentId(_id) {
    return axios.get(API_URL + "/student/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

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

  getCourseById(_id) {
    return axios.get(API_URL + "/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

  enroll(_id) {
    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: { Authorization: this.getToken() },
      }
    );
  }

  updateCourseById(_id, title, description, price) {
    return axios.patch(
      API_URL + "/" + _id,
      { title, description, price },
      { headers: { Authorization: this.getToken() } }
    );
  }

  deleteCourseById(_id) {
    return axios.delete(API_URL + "/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

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
