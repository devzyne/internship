import React from "react";
import Sidenav from "../../components/sidenav/Sidenav";
import BottomNav from "../../components/bottomNav/BottomNav";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="sidenav-container">
        <Sidenav />
      </div>
      <div className="layout-main">{children}</div>
      <div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Layout;
