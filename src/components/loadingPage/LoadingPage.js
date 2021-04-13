import React from "react";

import Carousel from "react-bootstrap/Carousel";

//assests
import Splash1 from "../../assets/splash 1.png";
import Splash2 from "../../assets/splash 2.png";
import Splash3 from "../../assets/splash 3.png";
import Logo from "../../assets/Mlogo-Blue.svg";
import "./LoadingPage.css";

function SplashScreen1() {
  return (
    <div className="loading-page">
      <img src={Logo} className="loading-page-logo" alt="logo" />
      <img src={Splash1} className="loading-page-splash" alt="splash" />
      <p className="loading-page-title">Do you gig or need GIG?</p>
      <p className="loading-page-text">
        Use our single, transparent, and intuitive platform for all your requirements.{" "}
      </p>
    </div>
  );
}

function SplashScreen2() {
  return (
    <div className="loading-page">
      <img src={Logo} className="loading-page-logo" alt="logo" />
      <img src={Splash2} className="loading-page-splash" alt="splash" />
      <p className="loading-page-title">Bringing the power of GIG Economy to your business</p>
      <p className="loading-page-text">By creating an ecosystem of niche suppliers and competent individuals</p>
    </div>
  );
}

function SplashScreen3() {
  return (
    <div className="loading-page">
      <img src={Logo} className="loading-page-logo" alt="logo" />
      <img src={Splash3} className="loading-page-splash" alt="splash" />
      <p className="loading-page-title">A true global GIG experience</p>
      <p className="loading-page-text">
        Be part of a multi-domain global talent pool or provide opportunities across the globe
      </p>
    </div>
  );
}

function LoadingPage() {
  //const random = [<SplashScreen1 />, <SplashScreen2 />, <SplashScreen3 />]
  return (
    <div className="loading-page-container">
      {/* {random[Math.floor(Math.random() * 3)]} */}
      <Carousel style={{ height: "100%" }}>
        <Carousel.Item interval={1000}>
          <SplashScreen1 />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <SplashScreen2 />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <SplashScreen3 />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default LoadingPage;
