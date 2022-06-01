import React, { useRef, useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AlertContent } from "../../../interfaces/Content";
import { setUser } from "../../../reducers/userReducer";
import loginService from "../../../services/login";

import "./Login.css";

const Login = () => {
    const passwordRef = useRef<HTMLInputElement>(null);
    const [alertContent, setAlertContent] = useState<AlertContent>({});
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    
    const handleLogin = (event: any) => {
        event.preventDefault();

        setAlertContent({});
        setIsLoading(true);

        Promise.all([
            loginService.login({
                userName, password
            })
        ]).then((res:any) => {
            res = res[0];

            if (res.success) {
                window.localStorage.setItem(
                    "loggedInUser", JSON.stringify(res.user)
                )
                
                dispatch(setUser(res.user));
                setUserName("");
                setPassword("");
            } else {
                throw res.error; 
            }
        }).catch(error => {
            setPassword("");
            setAlertContent({
                title: "Error",
                message: error.message,
                type: "danger"
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const AlertDismissible = (props: any) => {
        const [show, setShow] = useState(props.active ? true : false);
        const [type, setType] = useState(props.type);

        useEffect(() => {
            if (show === false && props.active) {
                setAlertContent({});
            }
        }, [show]);

        useEffect(() => {
            if (props.active) {
                const timeOut = setTimeout(() => {
                    show === true && setShow(false);
                }, 3000);

                return () => clearTimeout(timeOut);
            }
        }, []);

        if (show) {
            return (
                <Alert
                    variant={type}
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>{alertContent.title}</Alert.Heading>
                    <p>{alertContent.message}</p>
                </Alert>
            );
        }

        return null;
    };

    return (
        <div className="background">
            <div className="loginContainer">
                <div className="loginForm">
                    <div className="loginFormHeader">
                        <h1>Login</h1>
                    </div>
                    <div className="loginFormBody">
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                className="formControl formControlLogin"
                                id="inputUser"
                                placeholder="Usuario"
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") {
                                        passwordRef.current?.focus();
                                    }
                                }}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <input
                                type="password"
                                className="formControl formControlLogin"
                                id="inputPassword"
                                placeholder="Contraseña"
                                ref={passwordRef}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            {isLoading ? (
                                <AiOutlineLoading3Quarters className="loading" />
                            ) : (
                                <button
                                    type="submit"
                                    className="btn btnPrimary"
                                >
                                    INGRESAR
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <AlertDismissible
                active={alertContent.title}
                type={alertContent.type}
            />
        </div>
    );
}

export default Login;
