import React, { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = () => {
  const context = useContext(AuthContext);  // 이렇게 하면 이게 끝이다. 
  return (
    <nav className={classes.nav}>
      <ul>
        {/* {props.isLoggedIn && ( */}
        {context.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {/* {props.isLoggedIn && ( */}
        {context.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {/* {props.isLoggedIn && ( */}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
