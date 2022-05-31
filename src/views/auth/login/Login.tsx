import React, { useRef} from "react";
import "./Login.css";

const Login = () => {
    const passwordRef = useRef<HTMLInputElement>(null);

    return (
        <div className="background">
            <div className="loginContainer">
                <div className="loginForm">
                    <div className="loginFormHeader">
                        <h1>Login</h1>
                    </div>
                    <div className="loginFormBody">
                        <form onSubmit={(e) => e.preventDefault()}>
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
                            />
                            <input
                                type="password"
                                className="formControl formControlLogin"
                                id="inputPassword"
                                placeholder="Contraseña"
                                ref={passwordRef}
                            />
                            <button type="submit" className="btn btnPrimary">
                                INGRESAR
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
