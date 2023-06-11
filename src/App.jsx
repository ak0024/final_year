import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CodeEditor from "./components/Editor";
import Teacher from "./components/Teacher";
import Home from "./components/Home";
import Nomatch from "./components/Error";
import Login from "./components/Login";
import { Navbar } from "./components/navbar";
import StudentLogin from "./components/studentlogin";
import Student from "./components/Student";

export default function App() {
  const [teacherLoggedIn, setTeacherLoggedIn] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const teacherStatus = localStorage.getItem("teacherLoggedIn");
    const studentStatus = localStorage.getItem("studentLoggedIn");
    const storedStudentId = localStorage.getItem("studentId");

    if (teacherStatus) {
      setTeacherLoggedIn(JSON.parse(teacherStatus));
    }

    if (studentStatus) {
      setStudentLoggedIn(JSON.parse(studentStatus));
    }

    if (storedStudentId) {
      setStudentId(storedStudentId);
    }
  }, []);

  const handleTeacherLogin = () => {
    setTeacherLoggedIn(true);
    localStorage.setItem("teacherLoggedIn", JSON.stringify(true));
  };

  const handleTeacherLogout = () => {
    setTeacherLoggedIn(false);
    localStorage.setItem("teacherLoggedIn", JSON.stringify(false));
  };

  const handleStudentLogin = (studentId) => {
    setStudentLoggedIn(true);
    setStudentId(studentId);
    localStorage.setItem("studentLoggedIn", JSON.stringify(true));
    localStorage.setItem("studentId", studentId);
  };

  const handleStudentLogout = () => {
    setStudentLoggedIn(false);
    setStudentId("");
    localStorage.setItem("studentLoggedIn", JSON.stringify(false));
    localStorage.removeItem("studentId");
  };

  return (
    <div className="main">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:id" element={<CodeEditor />} />
        <Route
          path="/login"
          element={
            teacherLoggedIn ? (
              <Navigate to="/teacher" />
            ) : (
              <Login handleLogin={handleTeacherLogin} />
            )
          }
        />
        <Route
          path="/teacher"
          element={
            teacherLoggedIn ? (
              <Teacher handleLogout={handleTeacherLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/studentlogin"
          element={
            studentLoggedIn ? (
              <Navigate to="/student" />
            ) : (
              <StudentLogin
                handleLogin={handleStudentLogin}
                handleLogout={handleStudentLogout}
                setloid={setStudentId}
              />
            )
          }
        />
        <Route
          path="/student"
          element={
            studentLoggedIn ? (
              <Student handleLogout={handleStudentLogout} para={studentId} />
            ) : (
              <Navigate to="/studentlogin" />
            )
          }
        />
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </div>
  );
}
