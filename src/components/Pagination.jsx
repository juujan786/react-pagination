export default function Pagination({
  currentPage,
  noOfPages,
  handleChangePage,
  handlePageNext,
  handlePagePrev,
  lessThan6,
}) {
  const getPages = () => {
    if (noOfPages <= 5) {
      return Array.from({ length: noOfPages }, (_, i) => i);
    }
    if (currentPage <= 2) return [0, 1, 2, 3, 4];
    if (currentPage >= noOfPages - 3)
      return Array.from({ length: 5 }, (_, i) => noOfPages - 5 + i);
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  const pages = getPages();

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 0}
        onClick={handlePagePrev}
      >
        ◀️
      </button>

      {currentPage > 2 && noOfPages > 5 && (
        <>
          <button
            className={`pagination-btn ${currentPage === 0 && "active-page"}`}
            onClick={() => handleChangePage(0)}
          >
            0
          </button>
          <span className="dots">...</span>
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-btn ${currentPage === page && "active-page"}`}
          onClick={() => handleChangePage(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < noOfPages - 3 && noOfPages > 5 && (
        <>
          <span className="dots">...</span>
          <button
            className={`pagination-btn ${
              currentPage === noOfPages - 1 && "active-page"
            }`}
            onClick={() => handleChangePage(noOfPages - 1)}
          >
            {noOfPages - 1}
          </button>
        </>
      )}

      <button
        className="pagination-btn"
        disabled={currentPage === noOfPages - 1}
        onClick={handlePageNext}
      >
        ▶️
      </button>
    </div>
  );
}
