import React, { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard";
import { useSelector } from "react-redux";
import NoProductNotFound from "../shop/NoProductNotFound";
import FilterProducts from "../card/FilterProducts";
import Footer from "../footer/Footer";
import { motion } from "framer-motion";
import { productList, searchFilters } from "../functions/product";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const totalPages = Math.ceil(product.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    productList()
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        fetchDataFilter({ query: text });
      } else {
        loadData();
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [text]);

  const fetchDataFilter = (arg) => {
    searchFilters(arg).then((res) => {
      setProduct(res.data);
      setCurrentPage(1);
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded text-sm sm:text-base ${
              currentPage === i
                ? "bg-pink-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= Math.min(maxPagesToShow, totalPages); i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded text-sm sm:text-base ${
              currentPage === i
                ? "bg-pink-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      }
      if (totalPages > maxPagesToShow) {
        pageNumbers.push(<span key="ellipsis" className="px-3 py-1">...</span>);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className={`${loading ? "hidden" : "absolute z-20 block"}`}>
          {product?.length < 1 && <NoProductNotFound />}
        </div>

        <div className="w-full">
          <div className="flex flex-row sm:flex-row items-center justify-between py-6  sm:py-10 gap-4">
            <h1 className="text-lg flex sm:text-xl font-semibold text-[#374151]">
              All<span className="border-b-2 sm:border-b-3 border-pink-700"> Products</span>
            </h1>
            <div className="w-full sm:w-10/12 z-10">
              <FilterProducts
                fetchDataFilter={fetchDataFilter}
                loadData={loadData}
              />
            </div>
          </div>

          <div>
            {loading ? (
              <LoadingCard count={productsPerPage} />
            ) : (
              <motion.div
                initial={{ opacity: 0, translateY: 30 }}
                whileInView={{ opacity: 1, translateY: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.25, 0.25, 0.25, 0.75],
                  delay: 0.2,
                }}
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-10"
              >
                {currentProducts.map((item) => (
                  <ProductCard product={item} key={item._id} />
                ))}
              </motion.div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 py-6">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded text-sm sm:text-base ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              {renderPageNumbers()}

              <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded text-sm sm:text-base ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Last Page
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded text-sm sm:text-base ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;