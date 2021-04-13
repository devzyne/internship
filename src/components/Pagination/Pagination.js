import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export default function ({ setNewPage, hasMore }) {
  const [page, setPage] = useState(0);

  const handleClick = (newPage) => {
    if (newPage >= 0) {
      setPage(newPage);
      setNewPage(newPage);
    }
  };
  return (
    <>
      <Pagination>
        <Pagination.Prev
          onClick={() => handleClick(page - 1)}
          disabled={page === 0}
        />
        <Pagination.Next
          onClick={() => handleClick(page + 1)}
          disabled={!hasMore || false}
        />
      </Pagination>
    </>
  );
}
