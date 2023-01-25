import React from "react";

const AuthContext = React.createContext(
    {
        isLoggedIn: false,
        message: "React Context API",
    }
);  // context 객체 생성. (기본 컨텍스트)

export default AuthContext;