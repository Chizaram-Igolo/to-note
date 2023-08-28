import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getDocuments } from "../../utils/api";
import Table from "../../components/Table";
import Navbar from "../../components/Navbar";

export default function DocumentsList() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("to-note-token");

    getDocuments({ token, token_type: "bearer" }).then((res) => {
      setDocuments(res.data.data);
      console.log(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-w-[900px] w-[96%] flex flex-col mt-12 ml-8">
        <h2 className="text-xl font-semibold mb-4">View a Document</h2>
        {isLoading ? (
          <>
            <p className="mb-2 text-sm font-extralight text-gray-600">
              Populating list...Please wait.
            </p>
            <Skeleton count={20} className="w-[70%]" />
          </>
        ) : (
          <>{documents.length > 0 && <Table documents={documents} />}</>
        )}
      </div>
    </>
  );
}
