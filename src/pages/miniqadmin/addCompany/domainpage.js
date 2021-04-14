import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Placeholder from "../../../assets/no_manager_placeholder.svg";
import AdminHomeCard from "./card";
import Sidenav from "../../../components/sidenav/Sidenav.js";
import Pagination from "../../../components/Pagination/Pagination";
import plus from "../../../assets/plus.png";
import { authGet } from "../../../api/api";
import BottomNav from "../../../components/bottomNav/BottomNav";
import { BasePath } from "../../../globals/serviceURLs";
import "./adminDomain.css";

function CompanyDomainPage() {
  const history = useHistory();
  const [domainList, setDomainList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.AccessToken;

  const getDomain = (pageNo) => {
    setLoading(true);
    const path = "/cmpny/domain/all";
    const cid = localStorage.CompanyId;
    const params = {
      cid: cid,
    };
    authGet(BasePath, path, params, token)
      .then((res) => {
        setDomainList(res);
        setHasMore(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDomain(0);
  }, []);

  const handleRemove = (manager) => {
    window.location.reload();
  };

  return (
    <div id="adminDomain">
      <div className="admin-home">
        <Sidenav />
        <div className="right-screen">
          <div className="admin-home-content">
            <div className="managers-title">
              {domainList.length <= 1 ? <p>Domain</p> : <p>Domains</p>}
              <span className="plusbtn">
                <img
                  src={plus}
                  onClick={() => history.push("/company/add-domain")}
                />
              </span>
            </div>
            <div className="managers-list">
              {!loading && domainList.length === 0 && (
                <img src={Placeholder} alt="No Managers Added" />
              )}
              <div className="data">
                {!loading &&
                  domainList.length > 0 &&
                  domainList.map((manager, index) => (
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
                {domainList.length > 0 && (
                  <Pagination
                    setNewPage={(newPage) => getDomain(newPage)}
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

export default CompanyDomainPage;
