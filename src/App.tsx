import SignUp from "./pages/SignUp";
import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpSuccess from "./pages/SignUpSuccess";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import DocumentUploadForm from "./components/UploadForm";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register-success" element={<SignUpSuccess />} />
        <Route path="/upload-form" element={<DocumentUploadForm />} />
        <Route path="/side-bar" element={<Sidebar />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
