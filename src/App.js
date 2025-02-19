import { useCallback, useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import ProductCard from "./components/ProductCard";
import { PAGE_SIZE } from "./constants";
import "./styles.css";

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
