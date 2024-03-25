import { useState, useEffect } from "react";

var itemsPerPage = 8;

export default function usePagination(initialPage = 1, totalItems = 0) {
  const [currentPage, setCurrentPage] = useState(initialPage);
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
    setPage,
  };
}