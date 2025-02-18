import { useCallback, useEffect, useState } from "react";
import "./styles.css";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img className="image" src={product.images[0]} alt={product.title} />
      <span className="title">{product.title}</span>
    </div>
  );
}

// function Pagination({
//   currentPage,
//   noOfPages,
//   handleChangePage,
//   handlePageNext,
//   handlePagePrev,
//   lessThan6,
// }) {
//   const [pages, setPages] = useState([1, 2, 3, 4, 5]);

//   if (currentPage > 4) {
//     setPages((prev) => [currentPage - 1, currentPage, currentPage + 1]);
//   }

//   return (
//     <div className="pagination">
//       <button
//         className="pagination-btn"
//         disabled={currentPage === 0}
//         onClick={() => handlePagePrev()}
//       >
//         ◀️
//       </button>

//       {currentPage > 4 && (
//         <>
//           <button
//             className={`pagination-btn ${currentPage === 0 && "active-page"}`}
//             onClick={() => handleChangePage(0)}
//           >
//             0
//           </button>
//           <span className="dots">...</span>
//         </>
//       )}
//       {lessThan6
//         ? [...Array(noOfPages)].map((__, i) => (
//             <button
//               key={i}
//               className={`pagination-btn ${currentPage === i && "active-page"}`}
//               onClick={() => handleChangePage(i)}
//             >
//               {i}
//             </button>
//           ))
//         : [...pages].map((__, i) => (
//             <button
//               key={i}
//               className={`pagination-btn ${currentPage === i && "active-page"}`}
//               onClick={() => handleChangePage(i)}
//             >
//               {i}
//             </button>
//           ))}
//       {currentPage < noOfPages - 3 && <span className="dots">...</span>}
//       <button
//         className={`pagination-btn ${
//           currentPage === noOfPages - 1 && "active-page"
//         }`}
//         onClick={() => handleChangePage(noOfPages - 1)}
//       >
//         {noOfPages - 1}
//       </button>
//       <button
//         className="pagination-btn"
//         disabled={currentPage === noOfPages - 1}
//         onClick={() => handlePageNext()}
//       >
//         ▶️
//       </button>
//     </div>
//   );
// }

function Pagination({
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

const PAGE_SIZE = 7;

export default function App() {
  const [products, setProducts] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const noOfPages = 9;

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const fetchData = useCallback(async () => {
    try {
      const result = await fetch(
        "https://dummyjson.com/products/search?limit=500"
      );
      const json = await result.json();
      setProducts(json?.products);
      setTotalProducts(json?.total);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handlePageNext = () => {
    console.log("currentPage: ", currentPage);
    setCurrentPage((prev) => prev + 1);
  };

  const handlePagePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  if (!products) {
    return <h1> No Products Found!</h1>;
  }

  return (
    <div className="App">
      <h1>Pagination</h1>
      {noOfPages < 6 && !(noOfPages <= 1) ? (
        <Pagination
          currentPage={currentPage}
          noOfPages={noOfPages}
          handleChangePage={handleChangePage}
          handlePageNext={handlePageNext}
          handlePagePrev={handlePagePrev}
          lessThan6={true}
        />
      ) : (
        <Pagination
          currentPage={currentPage}
          noOfPages={noOfPages}
          handleChangePage={handleChangePage}
          handlePageNext={handlePageNext}
          handlePagePrev={handlePagePrev}
          lessThan6={false}
        />
      )}
      <div className="products-container">
        {products.slice(start, end).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
