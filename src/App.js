import React, { useEffect, useState, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const context = useContext(AuthContext);
  // console.log("App() RUN");

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Context를 사용할 때 아래 코드는 Context 컴포넌트로. */
  // useEffect(() => {
  //   // console.log("useEffect() RUN");
  //   const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  //   if (storedUserLoggedInInformation === "1") {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem("isLoggedIn", "1");
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.setItem("isLoggedIn", "0")
  //   setIsLoggedIn(false);
  // };

  return (
    <React.Fragment>
      {/* AuthContext Wrapper를 index.js에서 정해준다.  */}
      {/* <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}> */}
      <MainHeader />
      <main>
        {!context.isLoggedIn && <Login />}
        {context.isLoggedIn && <Home />}
      </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
