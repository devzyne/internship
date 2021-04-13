import React from "react";
import "./Chips.css";
import close from "../../assets/close.svg";

function Chips({ chip, onDelete }) {
  return (
    <div className="chips">
      {chip.nme}
      <button className="chips-button" type="button" onClick={onDelete}>
        <img src={close} alt="Remove" />
      </button>
    </div>
  );
}

export default Chips;
