import { useState, useEffect } from "react";

var itemsPerPage = 7;

export default function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / itemsPerPage));

  const setPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems]);

  return {
    currentPage,
    totalPages,
    setTotalItems,
    setPage,
  };
}