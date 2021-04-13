import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Routes from "../routes/Routes";
import Login from "../pages/common/login/login";
import Gig from "../pages/common/login/gig";
import Retrieve from "../pages/common/login/retrieve";

import Splash from "../pages/common/login/splash";
//import PartnerAdminHome from "../pages/partner/admin/adminHome/index";
import Freelance from "../pages/miniqadmin/freelance/Freelance";
import FreelanceAdmin from "../pages/miniqadmin/freelance/FreelanceHomeCard";
import FreelanceVerify from "../pages/miniqadmin/freelance/verifyFreelancer";
import Tnc from "../pages/common/tnc/tnc";
import ResetPassword from "../pages/common/login/reset";

const ProtectedRoutes = ({ isAuthenticated ,children, userType }) => {
  const history = useHistory();
  const expiry = localStorage.Expiry;
  const loggedInAt = localStorage.loggedInAt;
  const utyp = parseInt(localStorage.UserType);
  useEffect(() => {
    const currentDate = new Date();
    if (currentDate - loggedInAt > expiry) {
      localStorage.clear();
      history.push("/login");
    }
  }, []);

  return (
    <>
      
      <Switch>
        <Route exact path="/login" component={Login} isAuthenticated />
        <Route exact path="/gig" component={Gig} />
        <Route exact path="/retrieve" component={Retrieve} />
        <Route exact path="/reset" component={ResetPassword} />
        <Route exact path="/" component={Splash} />
        
        {isAuthenticated ? (
         
         <Routes />
        ) : (
          <Redirect to="/login" />
        )}
        <Route path="*" component={Splash} />
      </Switch>
       
      
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.UI.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoutes);
