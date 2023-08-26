import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { logout } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const cookies = new Cookies();

  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get("to-note-token");
    setToken(token);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout({ token, token_type: "bearer" }).then(
        (res) => res
      );

      console.log(response);

      if (response.status === 200) {
        setToken("");
        cookies.remove("to-note-token");

        navigate("/login", { state: { token } });
      }
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
    }
  };

  return (
    <nav className="w-100 h-[48px] sticky top-0 bg-transparent">
      <div className="w-100 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side of the navbar */}
          <div className="flex"></div>

          <div className="flex items-center">
            <button
              className="px-4 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
