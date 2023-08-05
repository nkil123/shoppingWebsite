import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

export const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to={currentUser ? "/" : "/auth"}>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
