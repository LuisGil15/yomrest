import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";

import Login from "../auth/login/Login";
import Dashboard from "../dashboard/Dashboard";

function Routes() {

    useEffect(() => {
        console.log(Router);
    }, []);

    return (
        <Router>
            <Switch>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Switch>
        </Router>
    );
}

export default Routes;
