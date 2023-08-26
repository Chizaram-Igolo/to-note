import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserType } from "../../utils/types";
import { getDocument, getProfile } from "../../utils/api";
import { initalUserValues } from "../../utils/constants";
import UploadDocument from "./UploadDocument";
import ViewDocument from "./DocumentsList";
import SignDocument from "./SignDocument";

export default function Dashboard() {
  const cookies = new Cookies();
  const [token, setToken] = useState("");

  const [user, setUser] = useState<UserType>(initalUserValues);

  useEffect(() => {
    const storedToken = cookies.get("to-note-token");

    setToken(storedToken);
    getProfile({ token: storedToken, token_type: "bearer" }).then((res) =>
      setUser(res.data.data)
    );

    console.log(user);
  }, []);

  const [response, setResponse] = useState("");
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");

  const handleSendRequest = () => {
    // Replace with actual API request logic
    const mockResponse = `Mock ${method} request to ${url}`;
    setResponse(mockResponse);
  };

  async function handleGetDocument() {
    try {
      const response = await getDocument(
        "99f98ad2-1ece-490a-8ba7-446db0dd30a6",
        { token, token_type: "bearer" }
      ).then((res) => res.data);

      console.log(response);

      // setSubmitting(false);
      // navigate("/dashboard", { state: { token } });
    } catch (err) {
      console.log(err.message);
      //     if (axios.isAxiosError(err))
      //       setErrorMessage(
      //         `An error occured while attempting to login: ${err.message}`
      //       );
      //     else if (err instanceof Error) setErrorMessage(err.message);
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
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
              className="w-10 h-10 rounded-full border-2 border-white rounded-full"
              src={`${user.image}files/admin-3c75b0daa0b611ec8d76a72c3c888e07/settings/image/d7062a42-1b2a-4973-9945-03abb1fffad6.png`}
              alt=""
            />
            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white  rounded-full"></span>
          </div>
        </div>
        <ul className="space-y-2">
          {/* Replace with actual collections */}
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

      <Outlet />

      {/* <div className="w-3/4 p-4">
        <h1 className="text-lg font-semibold mb-4">Upload a PDF</h1>
        <div className="flex space-x-4 mb-4">
          <select
            className="w-1/5 border p-1"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            className="flex-grow border p-1"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleGetDocument}
          >
            Send
          </button>
        </div>
        <h1 className="text-lg font-semibold mb-2">Response</h1>
        <pre className="border p-4 bg-gray-100">{response}</pre>
      </div> */}
    </div>
  );
}
