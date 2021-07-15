import { lazy, Suspense, useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Profile from "../pages/Profile/index";
import Home from "../pages/Home/index";

import routes from "./config";
import GlobalStyles from "../globalStyles";

const Router = () => {
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [inProfileMOde, setInProfileMOde] = useState(false);
  const onRegisterPage = () => {
    console.log("aaaaa");
    setInProfileMOde(true);
    // history.push("/register");
  };

  useEffect(() => {
    // Good!
    let us = JSON.parse(localStorage.getItem('user'));
    if(us?.token){
      setIsAuthorize(true)
    }
    console.log("inProfileMOde", inProfileMOde);

  }, []);
  return (
    <Suspense fallback={null}>
      <GlobalStyles />
      <Header
        onChaneMode={onRegisterPage}
        setInProfileMOde={setInProfileMOde}
        isAuthorize={isAuthorize} setIsAuthorize={setIsAuthorize}
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
      {inProfileMOde && isAuthorize ? (
        <Profile isAuthorize={isAuthorize} setIsAuthorize={setIsAuthorize}/>
      ) : (
        <Route
          isAuthorize={isAuthorize}
          component={(() => <Home isAuthorize={isAuthorize} setIsAuthorize={setIsAuthorize}/>)}
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
