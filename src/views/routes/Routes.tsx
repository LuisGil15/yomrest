import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Navigate
} from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit"
import { Provider, useSelector } from "react-redux"
import { userReducer, setUser } from "../../reducers/userReducer";

import Login from "../auth/login/Login";
import Dashboard from "../dashboard/Dashboard";

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

function Routes() {
    const [{user}, setUserAuth] = useState(store.getState());

    store.subscribe(() => {
        const newUser = store.getState();

        if (newUser.user.userName != "") {
            setUserAuth(store.getState());
        } else {
            setUserAuth({user: {}});
        }
    });

    useEffect(() => { 
        const loggetUserJSON = window.localStorage.getItem("loggedInUser");

        if (loggetUserJSON) {
            store.dispatch(setUser(JSON.parse(loggetUserJSON)));
        } else {
            setUserAuth({user: {}});
        }
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route
                        path="/"
                        element={
                            user.userName ? (
                                <Navigate to="/dashboard" replace state={user} />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            user.userName ? (
                                <Dashboard />
                            ) : (
                                <Navigate to="/" replace state={user} />
                            )
                        }
                    />
                    <Route path="*" element={<h1>Error 404 - Pagina no encontrada</h1>} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default Routes;
