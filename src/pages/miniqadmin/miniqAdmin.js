import React, { useEffect, useState } from "react";
import { authGet } from "../../api/api";
import {
  BasePath,
  getSearchSuggestions,
  GetIndustrySectorTechList,
} from "../../globals/serviceURLs";
import { useHistory } from "react-router-dom";
import {
  Category,
  pageSize,
  UserType,
} from "../../globals/applicationConstants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Refresh1 from "../miniqadmin/images/sync1.svg";
import Refresh2 from "../miniqadmin/images/sync2.svg";
import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";
import {
  addChips,
  deleteChips,
  toggleFilter,
  clearChips,
} from "../../redux/actions/uiActions";
import Carousel from "react-bootstrap/Carousel";
import {
  addIndustries,
  addTechnologies,
  addJobDescription,
} from "../../redux/actions/dataActions";

//components
import Layout from "../../containers/layout/Layout";
import IndustrySectorCard from "../../components/cards/IndustrySectorCard";
import TechnologyCard from "../../components/cards/TechnologyCard";
import BrowseByIndustry from "./browseIndustry/BrowseByIndustry";
import ProtectedRoute from "../../containers/ProtectedRoute";
import Pagination from "../../components/Pagination/Pagination";
import FreelancerHomeCard from "../miniqadmin/freelancer/freelancerHomeCard";
import CompanyHomeCard from "../miniqadmin/company/companyHomeCard";
import Spinner from "react-bootstrap/Spinner";
import Placeholder from "../../assets/no_manager_placeholder.svg";
//icons
import FilterIcon from "../../assets/filter icon.svg";
import "../miniqadmin/miniqComponents.css";

function MiniqAdmin({ addTechnologies, addIndustries }) {
  const [technologyList, setTechnologyList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [seeAllTech, setSeeAllTech] = useState(false);
  const [seeAllInd, setSeeAllInd] = useState(false);
  const [seeAllRole, setSeeAllRole] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [industries, setIndustries] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [role, setRole] = useState();
  const [matchAll, setMatchAll] = useState(true);
  const history = useHistory();
  const uid = localStorage.userId;
  const token = localStorage.AccessToken;
  const userData = JSON.parse(localStorage.UserData);
  const caid = userData.cat;
  const cid = parseInt(localStorage.CompanyId);
  const [freelancers, setFreelancers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFreelancers = (pageNo) => {
    setLoading(true);
    const path = "/fl/rct";
    const params = {
      pno: pageNo,
      psz: pageSize,
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

  const getData = () => {
    const config = {
      caid: caid,
      cmid: uid,
      cid: cid,
    };

    authGet(BasePath, GetIndustrySectorTechList, config, token)
      .then((res) => {
        setIndustryList(res.is);
        setTechnologyList(res.tech);
      })
      .catch((err) => {
        console.log(err);
      });

    const path = "/role/all";
    authGet(BasePath, path, {}, token)
      .then((res) => setRoleList(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    clearChips();
  }, []);

  const getSuggestions = (value) => {
    const config = {
      caid: caid,
      cont: value,
      cnt: 10,
    };
    authGet(BasePath, getSearchSuggestions, config, token)
      .then((res) => {
        setAutoSuggest(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const techCardClick = (tech) => {
    addChips(tech.nme);
    const techData = {
      nme: tech.nme,
      tid: tech.tid,
      rid: tech.rid || -1,
    };
    setTechnologies([...technologies, techData]);
  };

  const industryCardClick = (ind) => {
    addChips(ind.nme);
    setIndustries([...industries, ind]);
  };
  const addRole = () => {
    console.log("here");
  };
  const addTech = (tech) => {
    const techData = {
      nme: tech.nme.split(" ")[0],
      tid: tech.tid,
      rid: tech.rid || -1,
    };
    setTechnologies([...technologies, techData]);
  };

  const addInds = (ind) => {
    setIndustries([...industries, ind]);
  };

  const handleChipDelete = (chip) => {
    deleteChips(chip);
    setTechnologies(() => technologies.filter((i) => i.tid !== chip.tid));
  };

  const search = () => {
    const filter = {
      ...filterData,
      matchAll,
    };

    addTechnologies(technologies);
    addIndustries(industries);
    history.push("/gig-worker-details");
  };

  return (
    <Layout>
      <div className="search-page">
        <div className="search-page-header">
          <div className="fl-head-pos">
            <h3 className="fl-header">Miniq Admin</h3>
          </div>
        </div>

        {!seeAllInd && !seeAllTech && !seeAllRole && (
          <div className="search-page-main-title">
            <p className="search-page-text"> Check Recent Activities</p>
          </div>
        )}

        <Carousel>
          {!seeAllInd && !seeAllTech && !seeAllRole && (
            <Carousel.Item>
              <div id="mfl">
                <div className="mfl-card">
                  <div className="admin-home-content">
                    <Row>
                      <Col className="mcofl-image">
                        <Link to="/miniq/admin">
                          <img src={Refresh1} alt="icon" />
                        </Link>
                      </Col>
                      <Col className="mfl-rect">
                        <p className="recent-fl">Recent Freelancer</p>
                      </Col>
                    </Row>
                    <div className="managers-list">
                      {!loading && freelancers.length === 0 && (
                        <img src={Placeholder} alt="No Managers Added" />
                      )}
                      <div className="data">
                        {!loading &&
                          freelancers.length > 0 &&
                          freelancers.map((freelancer, index) => (
                            <FreelancerHomeCard
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
            </Carousel.Item>
          )}

          {!seeAllInd && !seeAllTech && !seeAllRole && (
            <Carousel.Item>
              <div id="mfl">
                <div className="mfl-card">
                  <div className="admin-home-content">
                    <Row>
                      <Col className="mcofl-image">
                        <Link to="/miniq/admin">
                          <img src={Refresh2} alt="icon" />
                        </Link>
                      </Col>
                      <Col className="mco-rect">
                        <p className="recent-co">Recent Company</p>
                      </Col>
                    </Row>
                    <div className="managers-list">
                      {!loading && freelancers.length === 0 && (
                        <img src={Placeholder} alt="No Managers Added" />
                      )}
                      <div className="data">
                        {!loading &&
                          freelancers.length > 0 &&
                          freelancers.map((freelancer, index) => (
                            <CompanyHomeCard
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
            </Carousel.Item>
          )}
        </Carousel>

        {!seeAllTech && !seeAllInd && !seeAllRole && (
          <div className="search-page-main">
            {caid === Category.It.value && technologyList.length > 0 && (
              <div className="search-page-main-container">
                <div className="search-page-main-title">
                  <p className="search-page-text">Browse Technology</p>

                  <p
                    onClick={() => setSeeAllTech(true)}
                    className="search-page-link"
                  >
                    See all
                  </p>
                </div>

                <div className="search-page-main-cards">
                  {technologyList.slice(0, 4).map((i, index) => (
                    <TechnologyCard
                      technology={i}
                      onClick={techCardClick}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="search-page-main-container">
              <div className="search-page-main-title">
                <p className="search-page-text">Browse Industry</p>

                <p
                  onClick={() => setSeeAllInd(true)}
                  className="search-page-link"
                >
                  See all
                </p>
              </div>

              <div className="search-page-main-cards">
                {industryList.slice(0, 4).map((i, index) => (
                  <IndustrySectorCard
                    industry={i}
                    onClick={industryCardClick}
                    key={index}
                  />
                ))}
              </div>
            </div>

            <div className="search-page-main-container">
              <div className="search-page-main-title">
                <p className="search-page-text">Role Type</p>

                <p
                  onClick={() => setSeeAllRole(true)}
                  className="search-page-link"
                >
                  See all
                </p>
              </div>

              <div className="search-page-main-cards">
                {roleList.slice(0, 4).map((i, index) => (
                  <IndustrySectorCard
                    industry={i}
                    onClick={industryCardClick}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* return <div className="roleCard">{role.nme}</div> */}
        {seeAllTech && (
          <TechnologyCard
            onClick={() => setSeeAllTech(false)}
            addTechnology={addTech}
          />
        )}
        {seeAllInd && (
          <IndustrySectorCard
            data={industryList}
            onClick={() => setSeeAllInd(false)}
            addIndustry={addInds}
          />
        )}
        {seeAllRole && (
          <TechnologyCard
            onClick={() => setSeeAllRole(false)}
            addTechnology={addTech}
          />
        )}
      </div>
    </Layout>
  );
}

const mapActionToProps = {
  addIndustries,
  addTechnologies,
};
const mapStateToProps = (state) => ({
  chips: state.UI.chips,
});

export default connect(mapStateToProps, mapActionToProps)(MiniqAdmin);
