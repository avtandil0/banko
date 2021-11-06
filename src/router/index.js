import { lazy, Suspense, useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Profile from "../pages/Profile/index";
import Home from "../pages/Home/index";
import Bank from "../pages/Bank/index";
import PrivateRoute from "../router/PrivateRoute"

import routes from "./config";
import GlobalStyles from "../globalStyles";


const Router = () => {

  const [user, setUser] = useState(null);

  const [isAuthorize, setIsAuthorize] = useState(false);
  const [openLoginRegisterDialog, setOpenLoginRegisterDialog] = useState(false);
  const [inProfileMOde, setInProfileMOde] = useState(false);
  const [visibleLoginRegisterDialog, setVisibleLoginRegisterDialog] =
    useState(false);
  const onRegisterPage = () => {
    console.log("aaaaa");
    setInProfileMOde(true);
    // history.push("/register");
  };

  useEffect(() => {
    // Good!
    let us = JSON.parse(localStorage.getItem('user'));
    // setUser(localStorage.getItem('user'))
    setUser(us);
    if (us?.token) {
      setIsAuthorize(true)
    }
    console.log("inProfileMOde", inProfileMOde);

  }, []);

  return (
    <Suspense fallback={null}>
      <GlobalStyles />

      {/* <Route path="/bank">
        <Bank />
      </Route> */}
      <Route exact path="/">
        <Header
          onChaneMode={onRegisterPage}
          setInProfileMOde={setInProfileMOde}
          isAuthorize={isAuthorize} setIsAuthorize={setIsAuthorize}
          openLoginRegisterDialog={openLoginRegisterDialog}
        />

        {inProfileMOde && isAuthorize ? (
          <Profile isAuthorize={isAuthorize} setIsAuthorize={setIsAuthorize} />
        ) : (
          <>
            <Route
              path="/"
              isAuthorize={isAuthorize}
              component={(() => <Home isAuthorize={isAuthorize} setIsAuthorize={setIsAuthorize} setOpenLoginRegisterDialog={setOpenLoginRegisterDialog} />)}
            />

          </>

        )}

        <Footer />
      </Route>
      <PrivateRoute user={user} authed={isAuthorize} path='/bank' component={Bank} />



    </Suspense>
  );
};

export default Router;
