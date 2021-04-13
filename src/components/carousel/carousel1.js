import React from "react";
import "./carousel1.css";
import Sidenav from "../sidenav/Sidenav";
function Carousel() {
  let value = 0;
  const carouselanimate = () => {
    let screen = window.screen.width;
    if (screen < 400) {
      if (value > -1200) {
        value = value - 300;
      } else {
        value = -10;
      }
    } else if (screen > 400 && screen < 700) {
      if (value > -1400) {
        value = value - 350;
      } else {
        value = -10;
      }
    } else if (screen > 700 && screen < 1000) {
      if (value > -2000) {
        value = value - 601;
      } else {
        value = 0;
      }
    } else if (screen > 1000 && screen < 1200) {
      if (value > -2000) {
        value = value - 465;
      } else {
        value = -225;
      }
    } else {
      if (value > -1800) {
        value = value - 450;
      } else {
        value = -225;
      }
    }
    document.getElementById("move").style.transform = `translateX(${value}px)`;
  };
  window.setInterval(carouselanimate, 2200);

  return (
    <>
      <div className="carousel_main">
        <div class="container">
          <div class="main" id="main">
            <ul id="move">
              <li>
                <img src="https://static.toiimg.com/photo/72975551.cms" alt="" />
              </li>

              <li>
                <img src="https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg" alt="" />
              </li>
              <li>
                <img
                  src="https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
              </li>
              <li>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIFljE39hZfBwAHRvHVJ-5a3_nOMBo_EEZNw&usqp=CAU"
                  alt=""
                />
              </li>
              <li>
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="" />
              </li>
              <li>
                <img src="https://static.toiimg.com/photo/72975551.cms" alt="" />
              </li>

              <li>
                <img src="https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
