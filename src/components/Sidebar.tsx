import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../utils/types";
import { getProfile, logout } from "../utils/api";

export default function Sidebar() {
  const [user, setUser] = useState<UserType | null>(null);
  const token = localStorage.getItem("to-note") as string;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // setToken(localStorage.getItem("to-note") as string);
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    localStorage.clear();

    navigate("/login");

    try {
      const response = await logout({ token, token_type: "bearer" }).then(
        (res) => res
      );

      console.log(response);

      if (response.status === 200) {
        localStorage.clear();

        navigate("/login");
      }
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
    }
  };

  if (!user) {
    const _getProfile = async () => {
      const resp = await getProfile({ token, token_type: "bearer" });
      setUser(resp.data.data);
    };

    _getProfile();
  }

  console.log(user);

  // useEffect(() => {
  //   const token = localStorage.getItem("to-note") as string;

  //   if (!user) {
  //     const _getProfile = async () => {
  //       const resp = await getProfile({ token, token_type: "bearer" });
  //       setUser(resp.data.data);
  //     };

  //     _getProfile();
  //   }

  //   console.log(user);
  // }, [user]);

  return (
    <div className="min-h-screen fixed min-w-[300px] bg-gray-200 p-4">
      <h1 className="text-lg font-semibold mb-4">
        <span className="font-bold">To-Note</span> Document Manager
      </h1>
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-md font-semibold mb-0">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="text-sm">{user?.email}</p>
        </div>

        <div className="relative">
          <img
            className="w-10 h-10 border-2 border-white rounded-full"
            src={`${
              user?.image.endsWith(".png")
                ? user?.image
                : user?.image +
                  "files/admin-3c75b0daa0b611ec8d76a72c3c888e07/settings/image/d7062a42-1b2a-4973-9945-03abb1fffad6.png"
            }`}
            alt={user?.initials}
          />
          <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white  rounded-full"></span>
        </div>
      </div>
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Upload a Document
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/view-document"
            className="text-blue-600 hover:underline"
          >
            View a Document
          </Link>
        </li>
      </ul>

      <div className="mt-6">
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
  );
}
