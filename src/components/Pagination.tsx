import Styles from "./Pagination.module.css";

function Pagination({
  currentPage,
  onPageChange,
  totalItemsCount,
  itemsPerPage,
  range = 1,
}) {
  // Calculate total pages (Range)
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  // Generate Visible Page Numbers
  const getVisiblePageNumbers = () => {
    const firstPage = 1;
    const lastPage = totalPages;

    if (currentPage <= range + 1) {
      return [
        ...Array.from({ length: range * 2 + 1 }, (_, i) => i + firstPage),
        "...",
        lastPage,
      ];
    } else if (currentPage >= lastPage - range) {
      return [
        firstPage,
        "...",
        ...Array.from(
          { length: range * 2 + 1 },
          (_, i) => lastPage - range * 2 + i
        ),
      ];
    } else {
      return [
        firstPage,
        "...",
        ...Array.from(
          { length: range * 2 + 1 },
          (_, i) => currentPage - range + i
        ),
        "...",
        lastPage,
      ];
    }
  };

  // Visible Page Numbers
  let visiblePageNumbers = getVisiblePageNumbers();

  // Handle Page Click
  const handlePageClick = (page) => {
    if (page !== "...") {
      onPageChange(page);
    }
  };

  // Handle Previous Page Button
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Handle Next Page Button
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Handle ellipsis click
  const handleEllipsisClick = (index) => {
    const ellipsisIndex = index;
    const currentPageIndex = visiblePageNumbers.indexOf(currentPage);

    if (currentPageIndex > ellipsisIndex) {
      onPageChange(Math.max(currentPage - 3, 1));
    } else if (currentPageIndex < ellipsisIndex) {
      onPageChange(Math.min(currentPage + 3, totalPages));
    } else {
      return false;
    }
  };

  // Dynamic Styling (Prev and Next Button)
  const prevStyle = `${Styles.btn} ${Styles.arrow} ${
    currentPage === 1 ? Styles.hidden : ""
  }`;

  const nextStyle = `${Styles.btn} ${Styles.arrow} ${
    currentPage === totalPages ? Styles.hidden : ""
  }`;

  return (
    <>
      <div className={Styles.pagination}>
        <button
          onClick={handlePreviousPage}
          className={prevStyle}
          disabled={currentPage === 1}
        >
          <strong className={Styles.strong}>&lt;</strong>
        </button>

        {visiblePageNumbers.map((page, index) => (
          <button
            key={index}
            className={`${Styles.btn} ${
              page === currentPage ? Styles.active : ""
            }`}
            onClick={() =>
              page === "..."
                ? handleEllipsisClick(index)
                : handlePageClick(page)
            }
            disabled={page === currentPage}
          >
            {page === "..." ? (
              <span className={Styles.span}>{page}</span>
            ) : (
              page
            )}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          className={nextStyle}
          disabled={currentPage === totalPages}
        >
          <strong className={Styles.strong}>&gt;</strong>
        </button>
      </div>

      <p className={Styles.label}>
        [ Page {currentPage} of {totalPages} ]
      </p>
    </>
  );
}

export default Pagination;
