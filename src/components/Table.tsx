import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DocumentType } from "../utils/types";
import { Link } from "react-router-dom";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../utils/functions";

export default function Table({ documents }: { documents: DocumentType[] }) {
  const [itemsPerPage] = useState(15);
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState<DocumentType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(documents.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(documents.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (
    event: React.MouseEvent<HTMLAnchorElement> | undefined
  ) => {
    // @ts-ignore
    const newOffset = (event.selected * itemsPerPage) % documents.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems && (
        <>
          <div className="flex gap-4 mb-2 font-semibold">
            <span className="w-[1.8rem] text-sm mt-[0.24rem]">S/N</span>

            <div className="w-[35%]">
              <span className="text-sm">Document ID</span>
            </div>

            <div className="w-[8%]">
              <span className="text-sm">Is Signed</span>
            </div>

            <div className="w-[20%]">
              <span className="text-sm">Created</span>
            </div>

            <div className="w-[20%]">
              <span className="text-sm">Updated</span>
            </div>

            <div className="w-[10%]">
              <span className="text-sm"></span>
            </div>
          </div>

          {currentItems.map((item, idx) => (
            <div key={item.id} className="flex gap-4 mb-2">
              <span className="w-[1.8rem] text-sm mt-[0.24rem]">{idx + 1}</span>

              <div className="w-[35%]">
                <span className="mr-2 text-red-600">
                  <FontAwesomeIcon icon={faFilePdf} />
                </span>
                <span>
                  <Link
                    to={`/dashboard/view-document/${item.id}`}
                    className="underline"
                  >
                    <span className="text-sm">{item.id}</span>
                  </Link>
                </span>
              </div>

              <div className="w-[8%]">
                <span className="text-xs">
                  {(item.signed_signatures as number) > 0 ? "Yes" : "No"}
                </span>
              </div>

              <div className="w-[20%]">
                <span className="text-xs">{formatDate(item.created_at)}</span>
              </div>

              <div className="w-[20%]">
                <span className="text-xs"> {formatDate(item.updated_at)}</span>
              </div>

              <div className="w-[10%]">
                {" "}
                <Link
                  to={`/dashboard/sign-document/${item.id}`}
                  className="underline"
                >
                  <span className="text-sm">Sign</span>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        // @ts-ignore
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="mb-8"
      />
    </>
  );
}
