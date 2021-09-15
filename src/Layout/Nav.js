import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth";
import classes from "./Nav.module.css";

const Nav = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
