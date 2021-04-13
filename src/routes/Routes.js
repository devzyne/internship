// ROUTE CONFIGS --> CAN HAVE ROUTES / NESTED ROUTES / PROTECTED ROUTES

import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
// import AdminHome from "../pages/partner/admin/adminHome/index";
import MiniqAdmin from "../pages/miniqadmin/miniqAdmin";
import Tnc from "../pages/common/tnc/tnc";
//import JobDetail from "../pages/jobDetail/jobDetail";
import CompanyCard from "../pages/miniqadmin/companycard/companycard";
//import PartnerAdminHome from "../pages/partner/admin/adminHome/index";
import Freelance from "../pages/miniqadmin/freelance/Freelance";

import FreelanceAdmin from "../pages/miniqadmin/freelance/FreelanceHomeCard";
import FreelanceVerify from "../pages/miniqadmin/freelance/verifyFreelancer";

import Payments from "../pages/miniqadmin/freelance/Payment";
// import ContingentWorkerJobList from "../pages/partner/contingentworker/jobList";
// import ContingentWorkerProfile from "../pages/partner/contingentworker/partnerWorkerDashboard/partnerdashboard";
// import ContingentWorkerJobProfile from "../pages/partner/contingentworker/partnerWorkerDashboard/partnerdashboard";
import MiniqAdminHome from "../pages/miniqadmin/miniqAdmin";
import AdminHomeCard from "../pages/miniqadmin/freelance/FreelanceHomeCard"; //new2
import AdminHomeCompanyCard  from "../pages/miniqadmin/company/companyHomeCard";
import AddCompany from "../pages/miniqadmin/addCompany/index";
import AddRateCard from "../pages/miniqadmin/ratecard/ratecard";
import ResetPassword from "../pages/common/login/reset";
import RateCard from "../pages/miniqadmin/ratecard/ratecard";  //new2

/*export const ROUTES = [
   {
     path: "/miniq/admin",
     key: "miniq-admin",
     exact: true,
     component: (props) => <MiniqAdmin {...props} />,
   },
   {
     path: "/miniq/freelancerHomeCard",
     key: "freelancer-homecard",
     exact: true,
     component: (props) => <AdminHomeCard {...props} />,
   },
   {
     path: "/miniq/companyHomeCard",
     key: " adminhome-companycard",
     exact: true,
     component: (props) => <AdminHomeCompanyCard {...props} />,
   },
  // {
  //   path: "/contingent-worker-job-list",
  //   key: "contingent-worker-job-list",
  //   exact: true,
  //   component: (props) => <ContingentWorkerJobList {...props} />,
  // },
  // {
  //   path: "/contingent-worker-profile",
  //   key: "contingent-worker-profile",
  //   exact: true,
  //   component: (props) => <ContingentWorkerProfile {...props} />,
  // },
  // {
  //   path: "/contingent-worker-job-profile",
  //   key: "contingent-worker-job-profile",
  //   exact: true,
  //   component: (props) => <ContingentWorkerJobProfile {...props} />,
  // },
  // {
  //   path: "/job-profile",
  //   key: "ejb6",
  //   exact: true,
  //   component: (props) => <JobBuilder6 {...props} />,
  // },
  {
    path: "/tnc",
    key: "tnc",
    exact: true,
    component: (props) => <Tnc {...props} />,
  },
  {
    path: "/admin/company/search",
    key: "admin-company-search",
    exact: true,
    component: (props) => <CompanyCard {...props} />,
  },
  {
    path: "/miniq/admin/add-company",
    key: "miniq-admin-addCompany",
    exact: true,
    component: (props) => <AddCompany {...props} />,
  },
  {
    path: "/miniq/admin/home",
    key: "miniq-admin-home",
    exact: true,
    component: (props) => <MiniqAdminHome {...props} />,
  },
   //{
   //  path: "/partner-add-manager",
   //  key: "partner-add-manager",
   //  exact: true,
   //  component: (props) => <PartnerAdminHome {...props} />,
   //},
  // {
  //   path: "/partner-add-contingent-worker",
  //   key: "partner-add-contingent-worker",
  //   exact: true,
  //   component: (props) => <PartnerAddManager {...props} />,
  // },
  {
    path: "/freelance",
    key: "freelances",
    exact: true,
    component: (props) => <Freelance {...props} />,
  },
  {
    path: "/freelance-payments",
    key: "payments",
    exact: true,
    component: (props) => <Payments {...props} />,
  },
  {
    path: "/freelance/admin",
    key: "freelance-admin",
    exact: true,
    component: (props) => <FreelanceAdmin {...props} />,
  },
  {
    path: "/freelance/verify",
    key: "freelance-admin",
    exact: true,
    component: (props) => <FreelanceVerify {...props} />,
  },
  {
    path: "/miniqadmin/ratecard",
    key: "miniqadmin-ratecard",
    exact: true,
    component: (props) => <AddRateCard {...props} />,
  },
  
  {
    path: "/company-ratecard",
    key: "company-ratecard",
    exact: true,
    component: (props) => <RateCard {...props} />,
  }
  
];
*/


function Routes() {
  return (
    <div>
      <Switch>
       <Route exact path="/freelance" component={Freelance}/>
       <Route exact path="/freelance/verify" component={FreelanceVerify}/>
       <Route exact path="/tnc" component={Tnc} />
       <Route exact path="/miniq/admin" component={MiniqAdmin} />
       <Route exact path="/miniq/freelancerHomeCard" component={AdminHomeCard} />
       <Route exact path="/admin/company/search" component={AddCompany} />
       <Route exact path="/miniq/admin/home" component={MiniqAdminHome} />
       <Route exact path="/freelance-payments" component={Payments} />
       <Route exact path="/company-ratecard" component={RateCard} />
       
      </Switch>
    </div>
  )
}

export default Routes
