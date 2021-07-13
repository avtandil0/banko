import { lazy, Suspense, useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Profile from "../pages/Profile/index";

import routes from "./config";
import GlobalStyles from "../globalStyles";

const Router = () => {
  const [inRegisterMOde, setInRegisterMOde] = useState(false);
  const onRegisterPage = () => {
    console.log('aaaaa');
    setInRegisterMOde(true)
    // history.push("/register");

  };

  useEffect(() => {
    // Good!
    console.log('inRegisterMOde', inRegisterMOde)
  }, []);
  return (
    <Suspense fallback={null}>
      <GlobalStyles />
      <Header onChaneMode={onRegisterPage} />
      {/* {inRegisterMOde ? <div> Rgeister</div> :
        <div>
          <Switch>
            {routes.map((routeItem) => {
              return (
                <Route
                  key={routeItem.component}
                  path={routeItem.path}
                  exact={routeItem.exact}
                  component={lazy(() => import(`../pages/${routeItem.component}`))}
                />
              );
            })}
          </Switch>
          <Footer />
        </div>
      } */}

      <Switch>
        {routes.map((routeItem) => {
          return (
            <div>
              {/* <Route path="/profile">
                <Profile />
              </Route> */}
              <Route
                key={routeItem.component}
                path={routeItem.path}
                exact={routeItem.exact}
                component={lazy(() => import(`../pages/${routeItem.component}`))}
              />
            </div>

          );
        })}
      </Switch>
      {/* <Footer /> */}

    </Suspense>
  );
};

export default Router;
