import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from "../../../components/button/Button";
import Sidenav from "../../../components/sidenav/Sidenav";
import BottomNav from "../../../components/bottomNav/BottomNav";
import customerType from "../../../assets/customer_type.png";
import partnerType from "../../../assets/partner_type.png";
import { BasePath } from '../../../globals/serviceURLs';
import { authGet,get } from "../../../api/api";
import { useHistory, Redirect } from "react-router-dom";
import "./viewCompany.css";
function ViewCompany() {
  const [details, setDetails] = useState({});
  const token = localStorage.AccessToken;

  const history = useHistory();
  useEffect(() => {
    const path = "/cmpny/byid";
    const params = {
      cid: 16,
    };
    authGet(BasePath, path, params, token)
      .then(res => {
        setDetails(res);
      }).catch(err => {
        console.log(err);
      })
  }, [])
  console.log(details);
  const initialsDisp = () => {
    if (details.nme) {
      const initials = details.nme.split(" ");
      return initials[0][0].toUpperCase() + initials[initials.length - 1][0].toUpperCase();
    } else if (details.eml) {
      const initials = details.eml[0];
      return initials.toUpperCase();
    } else return "";
  };
  return (
    <>
      <div id="viewCompany">
        <Sidenav />
        <Container fluid className="contain">
          <h1>{details.snme} Details</h1>

          <div className="profile-head">
            <div className="circle">
              <div className="head-icon">
                <p>{initialsDisp()}</p>

              </div>
              <button className="type"><img src={details.ctyp === 3 ? customerType : partnerType} alt="companyType" /></button>
              <h6>{details.ctyp === 3 ? "Customer" : "Partner"}</h6>
            </div>
            <div className="profile-head-right">
              <div>
                <h6>Company ID</h6>
                <p>{details.id}</p>
              </div>
              <div>
                <h6>Company Name</h6>
                <p>{details.nme}</p>
              </div>
              <div>
                <h6>Registration No</h6>
                <p>{details.rno}</p>
              </div>
              <div>
                <h6>Company Email</h6>
                <p>{details.eml}</p>
              </div>
              <div>
                <h6>Contact No</h6>
                <p>{details.phone}</p>
              </div>
              <div>
                <h6>Website</h6>
                <p>{details.web}</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="mainbody">
            <div className="bodyHead">
              <h4>Company Contact</h4>
            </div>
            <div className="bodyDetails right-align">
              <div>
                <h5>Contract Owner</h5>
                <p>ALI</p>
              </div>
              <div>
                <h5>Miniq Contact ID</h5>
                <p>12464165</p>
              </div>
            </div>
          </div>
          <hr />
          {/* <div className="mainbody">
            <div className="bodyHead">
              <h4>Admin Email</h4>
            </div>
            <div className="bodyDetails add">
              <div>
                <h5>Email 1</h5>
                <p>adminabc@amc.com</p>
              </div>
              <div>
                <h5>Email 1</h5>
                <p>adminabc@amc.com</p>
              </div>
              <div>
                <h5>Email 1</h5>
                <p>adminabc@amc.com</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="mainbody">
            <div className="bodyHead ">
              <h4>Domain</h4>
            </div>
            <div className="bodyDetails add">
              <div>
                <h5>Domain 1</h5>
                <p>adminabc.com</p>
              </div>
              <div>
                <h5>Domain 1</h5>
                <p>adminabc.com</p>
              </div>
              <div>
                <h5>Domain 1</h5>
                <p>adminabc.com</p>
              </div>
            </div>
          </div>
          <hr /> */}
          <div className="mainbody">
            <div className="bodyHead">
              <h4>Communication Details</h4>
            </div>
            <div className="bigData">
              <div>
                <h5>Company Address</h5>
                <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ma</p>
              </div>

            </div>
          </div>

          <hr />
          <div className="mainbody">
            <div className="bodyHead">
              <h4>Synopsis</h4>
            </div>
            <div className="bigData">
              <div>
                <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ma</p>
              </div>
            </div>
          </div>

          <div className="buttons">
            <Button
              className="button"
              type="submit"
              text="Add Admin"
              onClick={() => history.push("/company/add-admin")}
            />
            <Button
              className="button"
              type="submit"
              text="Add Domain"
              onClick={() => history.push("/company/add-domain")}
            />
            <Button
              className="button"
              type="submit"
              text="Edit"
            />
          </div>


        </Container>
        <BottomNav />
      </div>
    </>
  )
}

export default ViewCompany;