import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./styles/global.scss";

import SignIn from "./pages/user/Signin";
import SignUp from "./pages/user/Signup";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Students from "./pages/students/Students";
import Interview from "./pages/interview/Interview";
import Report from "./pages/report/Report";

import axios from "axios";

function App() {
  const [user, setUser] = useState({ name: null, email: null, id: null });

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const user = JSON.parse(localStorage.getItem("user"));
      setActiveUser(user);
      console.log(user);
    }
  }, []);

  useEffect(() => {
    if (user.name !== null) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const setActiveUser = (user) => {
    console.log(user);
    setUser({ email: user.email, id: user.id, name: user.name });
  };

  const logout = () => {
    setUser({ name: null, email: null, id: null });
    localStorage.removeItem("user");
    axios
      .get("/employee/destroy-session", { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        if (data.success === true) {
          toast.success(data.message);
        }
      });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <>
          <Navbar user={user} />
          <div className="container">
            <div className="menu-container">
              <Menu logout={logout} />
            </div>
            <div className="content-container">
              <Routes>
                <Route
                  path="/"
                  element={<Home user={user} logout={logout} />}
                />
                <Route
                  path="/students"
                  element={<Students user={user} logout={logout} />}
                />
                <Route
                  path="/interview"
                  element={<Interview user={user} logout={logout} />}
                />
                <Route
                  path="/report"
                  element={<Report user={user} logout={logout} />}
                />
                <Route
                  path="/signin"
                  element={<SignIn setActiveUser={setActiveUser} user={user} />}
                />
                <Route path="/signup" element={<SignUp />} user={user} />
              </Routes>
            </div>
          </div>
          <Footer />
        </>
      </div>
    </BrowserRouter>
  );
}

export default App;
