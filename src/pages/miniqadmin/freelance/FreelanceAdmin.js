import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Placeholder from "../../../assets/no_manager_placeholder.svg";
import AdminHomeCard from "./FreelanceHomeCard";
import Sidenav from "../../../components/sidenav/Sidenav.js";
import searchIcon from "../../../assets/search.svg";
import Pagination from "../../../components/Pagination/Pagination";
import { authGet } from "../../../api/api";
import BottomNav from "../../../components/bottomNav/BottomNav";
import { BasePath } from "../../../globals/serviceURLs";
import { UserType } from "../../../globals/applicationConstants";
import freelance from "./images/freelance.jpg";

function AdminHome() {
  const history = useHistory();
  const [freelancers, setFreelancers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.AccessToken;

  const getFreelancers = (pageNo) => {
    setLoading(true);
    const path = "/fl/rct";
    const params = {
      pno: pageNo,
      psz: 4,
    };
    const token = localStorage.AccessToken;
    authGet(BasePath, path, params, token)
      .then((res) => {
        setFreelancers(res.lst);
        setHasMore(res.mre);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getFreelancers(0);
  }, []);

  const handleChange = (e) => {
    //todo delay service calls
    const cid = localStorage.CompanyId;
    if (e.target.value.trim().length > 2) {
      const path = "/usr/srch";
      const params = {
        cid: cid,
        utyp: UserType.freelancer,
        eml: e.target.value,
        pno: 0,
        psz: 10,
      };
      authGet(BasePath, path, params, token).then((res) => {
        setFreelancers(res.lst);
      });
    } else if (e.target.value.trim().length === 0) {
      getFreelancers(0);
    }
  };

  const handleRemove = (freelancer) => {
    window.location.reload();
  };

  return (
    <div id="adminHome">
      <div id="fl">
        <div className="admin-home">
          <Sidenav />
          <div className="right-screen">
            <div className="admin-home-content">
              {/* <div className="fl-img-top">
                <p className="fl-space">space</p>   
                <img src={settings} className="fl-settings" />
                <img src={notif} className="fl-notif" />
                <img src={profile} className="fl-profile" />
                <img src={logout} className="fl-logout" />
                </div> */}
              <div className="fl-head-pos">
                <img src={freelance} className="fl-freelance" />
                <h3 className="fl-header">Manage Freelancer</h3>
              </div>
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
                {freelancers.length <= 1 ? (
                  <p>Freelancer</p>
                ) : (
                  <p>Freelancers</p>
                )}
              </div>
              <div className="managers-list">
                {!loading && freelancers.length === 0 && (
                  <img src={Placeholder} alt="No Managers Added" />
                )}
                <div className="data">
                  {!loading &&
                    freelancers.length > 0 &&
                    freelancers.map((freelancer, index) => (
                      <AdminHomeCard
                        freelancer={freelancer}
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
                  {freelancers.length > 0 && (
                    <Pagination
                      setNewPage={(newPage) => getFreelancers(newPage)}
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
    </div>
  );
}

export default AdminHome;
