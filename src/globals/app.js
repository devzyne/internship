import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import NetworkDetector from "./networkdetector";

import ProtectedRoutes from "./protectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div id="APP-page">
      <Provider store={store}>
        <ProtectedRoutes />
      </Provider>
    </div>
  );
}
export default NetworkDetector(App);
