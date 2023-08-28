import { Outlet, Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import UploadDocument from "./UploadDocument";
import DocumentsList from "./DocumentsList";
import ViewDocument from "./ViewDocument";
import SignDocument from "./SignDocument";

function Dashboard() {
  return (
    <>
      <Sidebar />

      <div className="min-w-[800px]  ml-[300px]">
        <Routes>
          <Route path="/" element={<UploadDocument />} />
          <Route path="/view-document" element={<DocumentsList />} />
          <Route path="/view-document/:id" element={<ViewDocument />} />
          <Route path="/sign-document/:id" element={<SignDocument />} />
          {/* </Route> */}
        </Routes>
      </div>
    </>
  );
}

export default Dashboard;
