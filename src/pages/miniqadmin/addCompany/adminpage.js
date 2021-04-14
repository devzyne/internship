import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Placeholder from "../../../assets/no_manager_placeholder.svg";
import AdminHomeCard from "./card";
import Sidenav from "../../../components/sidenav/Sidenav.js";
import searchIcon from "../../../assets/search.svg";
import Pagination from "../../../components/Pagination/Pagination";
import plus from "../../../assets/plus.png";
import { authGet } from "../../../api/api";
import BottomNav from "../../../components/bottomNav/BottomNav";
import { BasePath } from "../../../globals/serviceURLs";

import "./adminDomain.css";
import { UserType } from "../../../globals/applicationConstants";

function AdminHome() {
  const history = useHistory();
  const [customerManagers, setCustomerManagers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.AccessToken;

  const getManagers = (pageNo) => {
    setLoading(true);
    const path = "/usr/all";
    const cid = localStorage.CompanyId;
    const params = {
      cid: cid,
      pno: pageNo,
      psz: 4,
      utyp: UserType.manager,
    };
    authGet(BasePath, path, params, token)
      .then((res) => {
        setCustomerManagers(res.lst);
        setHasMore(res.mre);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   getManagers(0);
  // }, []);

  const handleChange = (e) => {
    //todo delay service calls
    const cid = localStorage.CompanyId;
    if (e.target.value.trim().length > 2) {
      const path = "/usr/srch";
      const params = {
        cid: cid,
        utyp: UserType.manager,
        eml: e.target.value,
        pno: 0,
        psz: 10,
      };

      authGet(BasePath, path, params, token).then((res) => {
        setCustomerManagers(res.lst);
      });
    } else if (e.target.value.trim().length === 0) {
      getManagers(0);
    }
  };

  const handleRemove = (manager) => {
    window.location.reload();
  };

  return (
    <div id="adminDomain">
      <div className="admin-home">
        <Sidenav />
        <div className="right-screen">
          <div className="admin-home-content">
            <div className="admin-home-header">
              <div className="admin-home-search">
                <img src={searchIcon} alt="search icon" />
                <input
                  type="text"
                  placeholder="search"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="managers-title">
              {customerManagers.length <= 1 ? <p>Admin</p> : <p>Admins</p>}
              <span className="plusbtn">
                <img
                  src={plus}
                  onClick={() => history.push("/company/add-admin")}
                />
              </span>
            </div>
            <div className="managers-list">
              {!loading && customerManagers.length === 0 && (
                <img src={Placeholder} alt="No Managers Added" />
              )}
              <div className="data">
                {!loading &&
                  customerManagers.length > 0 &&
                  customerManagers.map((manager, index) => (
                    <AdminHomeCard
                      manager={manager}
                      onRemove={handleRemove}
                      key={index}
                    />
                  ))}
              </div>
              {loading ? (
                <div className="loading-spinner">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : null}
              <div className="admin-home-pagination">
                {customerManagers.length > 0 && (
                  <Pagination
                    setNewPage={(newPage) => getManagers(newPage)}
                    hasMore={hasMore}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default AdminHome;
