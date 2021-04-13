import React, { useState } from "react";
import "./card.css";
import DefaultImage from "../../assets/industry_sector_default.svg";
import tickImg from "../../assets/tick.png";
function IndustrySectorCard({ industry, onClick, selected }) {
  const [tick, setTick] = useState(selected);
  console.log(industry);
  const handleClick = () => {
    if (onClick) {
      setTick(!tick);
      onClick(industry);
    }
  };

  return (
    <div className="mqcard" onClick={handleClick}>
      <div className="mqcard-tick">
        {tick && <img src={tickImg} alt="selected" />}
      </div>
      <p className="mqcard-text">{industry.nme}</p>
      <div className="mqcard-image">
        <img src={industry.pth || DefaultImage} alt={industry.nme} />
      </div>
    </div>
  );
}

export default IndustrySectorCard;
