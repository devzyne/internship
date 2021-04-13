import React, { useState, useEffect } from "react";
import "./Tabs.css";

function Tabs({ tab1, tab2, setPage, Reset }) {
  const [classNameFirst, setClassnameFirst] = useState("btn-primary");
  const [classNameSecond, setClassnameSecond] = useState("btn-outline-primary");
  const [resetClass, setResetClass] = useState();

  const handleClick = (e) => {
    if (e.target.value === "first") {
      setClassnameFirst("btn-primary");
      setClassnameSecond("btn-outline-primary");
      if (setPage) {
        setPage(0);
      }
    } else if (e.target.value === "second") {
      setClassnameFirst("btn-outline-primary");
      setClassnameSecond("btn-primary");
      if (setPage) {
        setPage(1);
      }
    }
  };

  useEffect(() => {
    setResetClass(Reset === true ? "for-reset" : "toggle-buttons-second");
  });

  return (
    <div className="tabs">
      <div className="toggle-buttons">
        {Reset === true ? null : (
          <button
            value="first"
            className={`btn ${classNameFirst} toggle-buttons-first`}
            onClick={handleClick}
            disabled={Reset === true}
          >
            {tab1}
          </button>
        )}
        <button
          className={`btn ${classNameSecond} ${resetClass}`}
          value="second"
          onClick={handleClick}
        >
          {tab2}
        </button>
      </div>
    </div>
  );
}

export default Tabs;
