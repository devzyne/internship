import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../../../containers/layout/Layout";
import Accordion from "react-bootstrap/Accordion";
import cal from "../../../pages/customer/manager/EmployerJobBuilder/EJB_assets/cal.svg";
import loc from "../../../pages/customer/manager/EmployerJobBuilder/EJB_assets/location_icon.png";
import service from "../../../pages/customer/manager/EmployerJobBuilder/EJB_assets/service.png";
import Button from "../../../components/button/Button";
import "./Freelance.css";

function VerifyFreelancer() {
  const [] = useState();
  const [] = useState({});
  const [education] = useState([]);
  const [] = useState([]);
  const [] = useState([]);
  const [] = useState([]);
  const [] = useState();
  const [projects] = useState([]);
  const [] = useState();
  const [] = useState();
  const [] = useState([]);
  const [socialMedia] = useState([]);
  const [review] = useState([]);
  const [] = useState(false);
  const [] = useState(false);
  const [] = useState(false);
  const [] = useState(false);
  const [statusDisplay] = useState("");

  // const bookmark = () => {
  //   const config = {
  //     gwid: gwid,
  //     cmid: cmid,
  //     bmk: !bmk,
  //   };

  //   put(BasePath, BookmarkGigWorker, config, token)
  //     .then((res) => {
  //       setBmk(res.bmkd);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const initialsDisp = () => {
  //   if (gigWorkerDetails.nme) {
  //     const initials = gigWorkerDetails.nme.split(" ");
  //     return initials[0][0].toUpperCase() + initials[initials.length - 1][0].toUpperCase();
  //   } else if (gigWorkerDetails.eml) {
  //     const initials = gigWorkerDetails.eml[0];
  //     return initials.toUpperCase();
  //   } else return "";
  // };

  return (
    <Layout>
      <div className="gig-profile aligndiv">
        <div className="first">
          <h2>Verify Freelancer</h2>
          {/* <img src={bmk ? bookmarkFilledIcon : bookmarkEmptyIcon} alt="bookmark" onClick={bookmark} /> */}
        </div>
        <Row className="profile-head">
          <Col className="profile-head-left">
            <div className="circle">
              <div className="head-icon"></div>
            </div>
            <h5 className="worker-status">{statusDisplay}</h5>
          </Col>
          <Col>
            <div className="profile-head-right">
              <h6>Level: </h6>
              <h6>Name: </h6>
              <h6>Email: </h6>
              <h6>Mobile Number: </h6>
            </div>
          </Col>
        </Row>
        <div className="ratings">
          <h5>Ratings:</h5>
          <div className="ratings-main">
            <p>OTACE: </p>
            <p>Communications: </p>
            <p>Competency: </p>
          </div>
        </div>

        <hr className="hr-pos-top" />
        <Row
          className="icons-pos"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Col className="one" style={{ maxWidth: "200px" }}>
            {" "}
            <div className="Img-pos">
              <img src={service} alt="icon" />
              <p></p>
            </div>
          </Col>

          <Col className="two" style={{ maxWidth: "200px" }}>
            {" "}
            <div className="Img-pos">
              <img src={loc} alt="icon" />
              <p></p>
            </div>
          </Col>
          <Col className="three" style={{ maxWidth: "350px" }}>
            {" "}
            <div className="Img-pos">
              <img src={cal} styles={"width:21px"} alt="icon" />
              <p></p>
            </div>
          </Col>
        </Row>
        {/* {gigWorkerDetails.maxrph && (
            <div className="last">
              <hr className="hr-pos-top" />
              <h5>Rate (per hour): {gigWorkerDetails.maxrph}</h5>
              {gigWorkerDetails.maxrph && (
                <Row>
                  <Col className="one">From: {gigWorkerDetails.minrph} </Col>
                  <Col className="two">To: {gigWorkerDetails.maxrph} </Col>
                </Row>
              )}
            </div>
          )} */}
        <hr className="hr-pos" />
        <div className="profile-info">
          <div>
            <h5>Company Details</h5>
            <div className="is-cards"></div>
          </div>
          <hr className="hr-pos" />

          <div>
            <h5>Bank Details</h5>
          </div>
        </div>
        <hr className="hr-pos" />

        <div>
          <h5>Industry Sector</h5>
          {/* <div className="is-cards">
                <Row lg={8} md={6} sm={3} xs={3} noGutters={true}>
                  {industryList.map((item, index) => {
                    return <SquareList key={index} item={item} type="industry" />;
                  })}
                </Row>
              </div> */}
        </div>
        <hr className="hr-pos" />
        <div>
          <h5>Technology</h5>
          {/* <div className="is-cards">
                <Row lg={8} md={6} sm={3} xs={3} noGutters={true}>
                  {technologyList.map((item, index) => {
                    return <SquareList key={index} item={item} type="technology" />;
                  })}
                </Row>
              </div> */}
        </div>
        {education.length > 0 && (
          <>
            <hr className="hr-pos" />
            <div>
              <h5>Education</h5>
              {/* {education.slice(0, 1).map((i, index) => (
                    <div key={index}>
                      <text>{i.deg}</text>
                      <text>{i.uni}</text>
                      <text>{i.yr}</text>
                    </div>
                  ))} */}
            </div>
            {/* <Accordion>
                  <Accordion.Toggle as="div" variant="link" eventKey="0">
                    {education.length > 1 && <p style={{ cursor: "pointer" }}>See all</p>}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <>
                      {education.slice(1, projects.length).map((i, index) => (
                        <div key={index}>
                          <text>{i.deg}</text>
                          <text>{i.uni}</text>
                          <text>{i.yr}</text>
                        </div>
                      ))}
                    </>
                  </Accordion.Collapse>
                </Accordion> */}
          </>
        )}
        <hr className="hr-pos" />
        {projects.length > 0 && (
          <>
            <div>
              <h5>Projects</h5>
              {/* {projects.slice(0, 1).map((i, index) => (
                    <div key={index}>
                      <h6>{i.tle}</h6>
                      <text>{i.desc} </text>
                    </div>
                  ))} */}
            </div>
            <Accordion>
              <Accordion.Toggle as="div" variant="link" eventKey="0">
                {projects.length > 1 && (
                  <p style={{ cursor: "pointer" }}>See all</p>
                )}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <>
                  {/* {projects.slice(1, projects.length).map((i, index) => (
                        <div key={index}>
                          <h6>{i.tle}</h6>
                          <text>{i.desc} </text>
                        </div>
                      ))} */}
                </>
              </Accordion.Collapse>
            </Accordion>
          </>
        )}

        <hr className="hr-pos" />
        {/* {certificate.length > 0 && ( */}
        <div>
          <h5>Additional Qualification</h5>
          {/* <p>See all</p> */}
          <div>
            {/* {certificate.slice(0, 1).map((i, index) => (
                    <div key={index}>
                      <text>
                        {i.tle}, {i.yr}
                      </text>
                    </div>
                  ))} */}
          </div>
          {/* <Accordion>
                  <Accordion.Toggle as="div" variant="link" eventKey="0">
                    {certificate.length > 1 && <p style={{ cursor: "pointer" }}>See all</p>}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <>
                      {certificate.slice(1, certificate.length).map((i, index) => (
                        <div key={index}>
                          <text>
                            {i.tle}, {i.yr}
                          </text>
                        </div>
                      ))}
                    </>
                  </Accordion.Collapse>
                </Accordion> */}
        </div>

        <hr className="hr-pos" />
        {socialMedia.length > 0 && (
          <div className="social-media">
            <h5>Social Media Link</h5>
            <text>LinkedIn:</text>
            <text>StackOverFlow:</text>
            <text>Medium:</text>
            <text>Github:</text>
            <text>Slack:</text>
            <text>Others:</text>
          </div>
        )}

        {socialMedia.length > 0 && <hr className="hr-pos" />}
        <div>
          {review.length > 0 && (
            <>
              <h6>Review</h6>
              <text>Review</text>
              <p className="review-date">date(rated_on)</p>
            </>
          )}
        </div>

        {/* {review.length > 0 && <hr className="hr-pos" />} */}
        <Row>
          <Col className="button-col">
            <Button className="button" type="button" text="Verify" />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default VerifyFreelancer;
