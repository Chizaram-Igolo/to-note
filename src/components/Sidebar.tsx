import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserType } from "../utils/types";
import { getDocument, getProfile } from "../utils/api";
import { initalUserValues } from "../utils/constants";

export default function Sidebar() {
  const cookies = new Cookies();
  const [token, setToken] = useState("");

  const [user, setUser] = useState<UserType>(initalUserValues);

  useEffect(() => {
    const storedToken = cookies.get("to-note-token");

    setToken(storedToken);
    getProfile({ token: storedToken, token_type: "bearer" }).then((res) => {
      console.log(res.data);
      setUser(res.data.data);
    });

    console.log(user);
  }, []);

  return (
    <div className="min-h-screen fixed min-w-[300px]  bg-gray-200 p-4">
      <h1 className="text-lg font-semibold mb-4">
        <span className="font-bold">To-Note</span> Document Manager
      </h1>
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-md font-semibold mb-0">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm">{user.email}</p>
        </div>

        <div className="relative">
          <img
            className="w-10 h-10 border-2 border-white rounded-full"
            src={`${
              user.image.endsWith(".png")
                ? user.image
                : user.image +
                  "files/admin-3c75b0daa0b611ec8d76a72c3c888e07/settings/image/d7062a42-1b2a-4973-9945-03abb1fffad6.png"
            }`}
            alt={user.initials}
          />
          <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white  rounded-full"></span>
        </div>
      </div>
      <ul className="space-y-2">
        {/* Replace with actual collections */}
        <li>
          <Link
            to="/dashboard/upload-document"
            className="text-blue-600 hover:underline"
          >
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
        <li>
          <Link
            to="/dashboard/sign-document"
            className="text-blue-600 hover:underline"
          >
            Sign a Document
          </Link>
        </li>
      </ul>
    </div>
  );
}
