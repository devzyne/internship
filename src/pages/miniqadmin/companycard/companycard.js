import React, { useEffect, useState } from "react";
import Layout from "../../../containers/layout/Layout";

import "./companycard.css";

function AdminHomeCompany() {
  return (
    <Layout>
      <div className="admin-company">
        <div className="admin-home-search">
          <input type="text" placeholder="Search for companies" />
        </div>
        <div className="manager-titles"></div>
      </div>
    </Layout>
  );
}

export default AdminHomeCompany;
