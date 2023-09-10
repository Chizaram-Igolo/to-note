import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";

import SignUpSuccess from "./pages/Authentication/SignUpSuccess";
import SignUp from "./pages/Authentication/SignUp";
import SignIn from "./pages/Authentication/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";

import "./App.css";
import Protected from "./pages/Authentication/Protected";

// function Home() {

// }

function App() {
  const token = localStorage.getItem("to-note") as string;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // setToken(localStorage.getItem("to-note") as string);
      // navigate("/login");
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/register-success" element={<SignUpSuccess />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
