import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { BasePath, GetSliderData } from "../../globals/serviceURLs";
import { authGet } from "../../api/api";
import "./Carousel.css";
function CarouselDisplay() {
  const [carouselData, setCarouselData] = useState([]);

  const cmid = localStorage.userId;
  const token = localStorage.AccessToken;

  const getCarouselData = () => {
    const config = {
      cmid: cmid,
    };

    authGet(BasePath, GetSliderData, config, token)
      .then((res) => {
        setCarouselData(res);
      })
      .catch(() => {
        setCarouselData([]);
      });
  };

  useEffect(() => {
    getCarouselData();
  }, []);

  return (
    <div className="slider-container">
      <Carousel
        style={{ height: "100%" }}
        controls={false}
        indicators={true}
        className="slider-block"
      >
        {carouselData.length > 0 &&
          carouselData.map((i, index) => {
            return (
              <Carousel.Item key={index}>
                <Card style={{ border: "none" }}>
                  <Card.Img src={i.img} />
                  <Card.ImgOverlay>
                    <Card.Title className="tle">{i.tle}</Card.Title>

                    <div className="caraousel-stle" style={{ width: "73%" }}>
                      <div
                        className="stle"
                        dangerouslySetInnerHTML={{ __html: i.stle }}
                      />
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
}
export default CarouselDisplay;
