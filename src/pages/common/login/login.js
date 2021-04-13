import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { post, authGet } from "../../../api/api";
import {
  validateUsername,
  validatePassword,
} from "../../../utils/validationUtils";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import MBQLogo from "../../../assets/Mlogo-Blue.svg";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { login } from "../../../redux/actions/uiActions";
import { connect } from "react-redux";
import tiny from "./images/tiny.jpg";
import { BasePath } from "../../../globals/serviceURLs";
import {
  UserType,
  inputFieldsLength,
} from "../../../globals/applicationConstants";
import "./styles/login.css";

function Login({ login }) {
  const params = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState({
    spinner: false,
    page: true,
  });
  const [error, setError] = useState();

  const loginClick = (event) => {
    event.preventDefault();
    setLoading({
      ...loading,
      spinner: true,
    });

    if (username && password) {
      if (
        validateUsername(username) &&
        validatePassword(password) &&
        password.length > inputFieldsLength.PasswordMinLength
      ) {
        const path = "/login";
        const config = {
          pwd: password,
          unme: username,
        };
        post(BasePath, path, config)
          .then((result) => {
            localStorage.setItem("AccessToken", result.atk);
            localStorage.setItem("username", username);
            localStorage.setItem("Expiry", result.exp);
            localStorage.setItem("userId", result.uid);
            localStorage.setItem("UserType", result.utp);
            localStorage.setItem("Ipacode", result.ipa);
            localStorage.setItem("loggedInAt", Date.parse(new Date()));
            setError("");
            const newPath = "/usr/det";
            const params = {
              uid: result.uid,
              utyp: result.utp,
            };
            authGet(BasePath, newPath, params, result.atk).then((res) => {
              localStorage.setItem("CompanyId", res.cid);
              login();
              setLoading({
                ...loading,
                spinner: false,
              });
              localStorage.setItem("UserData", JSON.stringify(res));
              if (result.ipa) {
                history.push("/edit-credentials");
                return;
              } else {
                switch (result.utp) {
                  case UserType.customerAdmin:
                    history.push("/customer/admin/home");
                    break;
                  case UserType.customerManager:
                    history.push("/customer/manager/home");
                    break;
                  case UserType.partnerAdmin:
                    history.push("/partner/admin/home");
                    break;
                  case UserType.miniqAdmin:
                    history.push("/");
                    break;
                  case UserType.partnerContingentWorker:
                  case UserType.freelancer:
                    history.push("/gigworker/home");
                    break;
                }
              }
            });
          })
          .catch((err) => {
            if (err.err) {
              setError(err.err);
            }
            setLoading({
              ...loading,
              spinner: false,
            });
          });
      } else {
        setError("Invalid Username or Password");
        setLoading(false);
      }
    } else {
      setError("Username or Password cannot be empty");
      setLoading({
        ...loading,
        spinner: false,
      });
    }
  };

  const showAlert = () => {
    const fromPage = params.get("fromPage");
    if (fromPage === "signup") {
      return (
        <Alert className="login-alert" variant="primary">
          You have successfully signed up. Login to continue
        </Alert>
      );
    } else if (fromPage === "loggedOut") {
      return (
        <Alert className="login-alert" variant="danger">
          You are logged out. Login to continue
        </Alert>
      );
    } else return null;
  };

  return (
    <div id="login-screens" className="mlogin">
      <div className="left-screen">
        <img src={MBQLogo} alt="MinimumQue" className="miniq-logo" />
        {showAlert()}
        <Form className="main-div">
          <Form.Group controlId="username">
            <div className="form-label">
              <Form.Label>Username</Form.Label>
              <Link to="/retrieve">Retrieve</Link>
            </div>
            <Form.Control
              className="input-relative"
              onChange={(e) => setUsername(e.target.value.trim())}
              value={username}
              type="text"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <div className="form-label">
              <Form.Label>Password</Form.Label>
              <Link to="/reset">Reset</Link>
            </div>
            <Form.Control
              className="input-relative"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              maxLength={inputFieldsLength.PasswordMaxLength}
            />
          </Form.Group>
          <span className="errata-style">{error}</span>
        </Form>
        <br />
        <br />
        <div className="ret-spin-pos">
          {loading.spinner && <Spinner animation="border" variant="primary" />}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={loginClick}
          disabled={loading.spinner}
        >
          Login
        </button>
        <p>
          <b>
            New User? <Link to="/gig"> Sign Up</Link>
          </b>
        </p>
      </div>
      <div className="right-screen">
        <img src={tiny} alt="MinimumQue" />
      </div>
    </div>
  );
}

export default connect(null, { login })(Login);
