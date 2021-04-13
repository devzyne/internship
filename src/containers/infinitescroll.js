import React, { useRef, useCallback } from "react";
import Spinner from "react-bootstrap/Spinner";

function InfiniteScroll({
  className,
  children,
  hasMore,
  loading,
  onThresholdReached,
}) {
  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && onThresholdReached) {
          onThresholdReached();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, onThresholdReached]
  );

  return (
    <>
      <div className={className}>{children}</div>
      {hasMore ? (
        <div ref={lastElement} className="loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default InfiniteScroll;
