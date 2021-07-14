import { lazy, Suspense, useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Profile from "../pages/Profile/index";

import routes from "./config";
import GlobalStyles from "../globalStyles";

const Router = () => {
  const [inProfileMOde, setInProfileMOde] = useState(false);
  const onRegisterPage = () => {
    console.log("aaaaa");
    setInProfileMOde(true);
    // history.push("/register");
  };

  useEffect(() => {
    // Good!
    console.log("inProfileMOde", inProfileMOde);

  }, []);
  return (
    <Suspense fallback={null}>
      <GlobalStyles />
      <Header
        onChaneMode={onRegisterPage}
        setInProfileMOde={setInProfileMOde}
      />
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
      {inProfileMOde ? (
        <Profile />
      ) : (
        <Route

        component={lazy(() =>
          import(`../pages/${'Home'}`)
        )}
      />
        // <Switch>
        //   {routes.map((routeItem) => {
        //     return (
        //       <div>
        //         <Route
        //           key={routeItem.component}
        //           path={routeItem.path}
        //           exact={routeItem.exact}
        //           component={lazy(() =>
        //             import(`../pages/${routeItem.component}`)
        //           )}
        //         />
        //       </div>
        //     );
        //   })}
        // </Switch>
      )}

      <Footer />
    </Suspense>
  );
};

export default Router;
