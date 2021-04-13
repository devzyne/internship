import React, { useState } from "react";
import DefaultImage from "../../assets/technology_default.svg";
import "./card.css";
import tickImg from "../../assets/tick.png";
function TechnologyCard({ technology, onClick, selected }) {
  const [tick, setTick] = useState(selected);
  const handleClick = () => {
    if (onClick) {
      setTick(!tick);
      onClick(technology);
    }
  };
  return (
    <div className="mqcard" onClick={handleClick}>
      <div className="mqcard-tick">
        {tick && <img src={tickImg} alt="selected" />}
      </div>
      <p className="mqcard-text">{technology.nme}</p>
      <div className="mqcard-image">
        <img src={technology.pth || DefaultImage} alt={technology.nme} />
      </div>
    </div>
  );
}
export default TechnologyCard;
