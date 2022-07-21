/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Routes, Redirect, useLocation } from "react-router-dom";

// core components
import routes from "../../utils/routes.js";
import gamePage from "../../pages/gamePage";
import leaderboardPage from "../../pages/leaderboardPage";

function Admin(props) {
 
  return (
    <>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <div className="main-panel"  data={color}>
              <Routes>
                <Route
                  path={routes.gamePage}
                  component={gamePage}
                />
                <Route
                  path={routes.leaderboardPage}
                  component={leaderboardPage}
                />
                {/* <Redirect from="*" to="/" /> */}
              </Routes>
              {
                // we don't want the Footer to be rendered on map page
                // location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
}

export default Admin;
