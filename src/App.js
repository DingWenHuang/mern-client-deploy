import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import UpdateCourseComponent from "./components/update-course-component";
import UpdateUserComponent from "./components/update-user-component";
import UpdatePasswordComponent from "./components/update-password-component";

import { useState } from "react";
import authService from "./services/auth.service";
import CourseService from "./services/course.service";

function App() {
  let [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  let [currentCourse, setCurrentCourse] = useState(
    CourseService.getCurrentCourse()
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route index element={<HomeComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route
              path="/login"
              element={
                <LoginComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProfileComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/profile/update"
              element={
                <UpdateUserComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/profile/changepassword"
              element={
                <UpdatePasswordComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/course"
              element={
                <CourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentCourse={currentCourse}
                  setCurrentCourse={setCurrentCourse}
                />
              }
            />
            <Route
              path="/course/update"
              element={
                <UpdateCourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentCourse={currentCourse}
                  setCurrentCourse={setCurrentCourse}
                />
              }
            />
            <Route
              path="/postCourse"
              element={
                <PostCourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/enroll"
              element={
                <EnrollComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
