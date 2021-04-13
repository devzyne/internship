import React from "react";
import MBQLogo from "../../../assets/Mlogo-Blue.svg";
import GP from "../../../assets/Gig-Pic.svg";
import Button from "../../../components/button/Button";
import { useHistory } from "react-router-dom";
import "./styles/gig.css";

function Gig() {
  const history = useHistory();
  const handleClick = (e) => {
    history.push("/signup/customer");
  };
  const handlegig = (e) => {
    history.push("/signup/gig");
  };
  return (
    <div id="gig-screen">
      <img src={MBQLogo} alt="MinimumQue" className="miniq-logo" />
      <img src={GP} alt="MinimumQue" className="main-img" />
      {/*<p>Choose the option below to sign up</p>*/}

      <Button
        className="button"
        type="submit"
        onClick={handleClick}
        text="I need GIG"
      />

      <Button
        onClick={handlegig}
        className="btn btn-primary"
        type="submit"
        text="I GIG"
      />
    </div>
  );
}

export default Gig;
