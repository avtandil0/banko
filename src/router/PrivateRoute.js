import { useEffect } from "react";

import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, user, authed, ...rest }) {

    useEffect(() => {
        // Good!
        console.log('authed', authed, user)
        // goTo();
    }, [authed]);

    if (authed && user?.userRoleId == 2 && user?.bankId) {
        return <Component />;
    }
    return <h1></h1>;

}