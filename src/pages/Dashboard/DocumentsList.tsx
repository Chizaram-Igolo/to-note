import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getDocuments } from "../../utils/api";
import Table from "../../components/Table";

export default function DocumentsList() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("to-note") as string;

    getDocuments({ token, token_type: "bearer" }).then((res) => {
      setDocuments(res.data.data);
      console.log(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-w-[800px] w-[96%] flex flex-col ml-8">
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">View a Document</h2>
        {isLoading ? (
          <>
            <p className="mb-2 text-sm font-extralight text-gray-600">
              Populating list...Please wait.
            </p>
            <Skeleton count={20} className="w-[70%]" />
          </>
        ) : (
          <>
            {documents.length > 0 ? (
              <Table documents={documents} />
            ) : (
              <span className="text-gray-600">
                You have not uploaded any documents yet.
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
