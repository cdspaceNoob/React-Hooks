import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const AuthContext = React.createContext(
    {
        isLoggedIn: false,
        onLogout: () => { },
        onLogin: (email, password) => { },
    }
);  // context 객체 생성. (기본 컨텍스트)

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // console.log("useEffect() RUN");
        const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
        if (storedUserLoggedInInformation === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.setItem("isLoggedIn", "0")
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;