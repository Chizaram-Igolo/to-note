import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import SignUpSuccess from "./pages/Authentication/SignUpSuccess";
import SignUp from "./pages/Authentication/SignUp";
import SignIn from "./pages/Authentication/SignIn";
import Sidebar from "./components/Sidebar";

import "./App.css";

import Protected from "./pages/Authentication/Protected";
import UploadDocument from "./pages/Dashboard/UploadDocument";
import ViewDocument from "./pages/Dashboard/ViewDocument";
import SignDocument from "./pages/Dashboard/SignDocument";
import DocumentsList from "./pages/Dashboard/DocumentsList";

function App() {
  const cookies = new Cookies();
  const [appCookies, setAppCookies] = useState("");
  const [isAppCookies, setIsAppCookies] = useState(false);

  useEffect(() => {
    setAppCookies(cookies.get("to-note-token"));
    setIsAppCookies(true);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register-success" element={<SignUpSuccess />} />

        {isAppCookies && (
          <Route
            path="*"
            element={
              <Protected isLoggedIn={Boolean(appCookies)}>
                <div className="relative flex h-screen">
                  <Sidebar />

                  <div className="min-w-[900px] w-[100%] ml-[300px]">
                    <Routes>
                      <Route
                        path="/dashboard/upload-document"
                        element={<UploadDocument />}
                      />
                      <Route
                        path="/dashboard/view-document"
                        element={<DocumentsList />}
                      />
                      <Route
                        path="/dashboard/view-document/:id"
                        element={<ViewDocument />}
                      />
                      <Route
                        path="/dashboard/sign-document"
                        element={<SignDocument />}
                      />
                      {/* </Route> */}

                      <Route path="/side-bar" element={<Sidebar />} />
                    </Routes>
                  </div>
                </div>
              </Protected>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
