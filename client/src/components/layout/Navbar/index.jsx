import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout, loadUser } from "../../../redux";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      loadUser(dispatch);
    }
  }, [dispatch]);

  const onLogout = (e) => {
    dispatch(logout());
  };

  const authLinks = (
    <>
      <li>
        <Link to={"/"}>Welcome {user?.name?.toUpperCase()}</Link>
      </li>
      <li>
        <Link to={"/login"} onClick={onLogout}>
          <i className="fa fa-sign-out fa-md" />
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to={"/register"}>Register</Link>
      </li>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
      <li>
        <Link to={"/about"}>About</Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-primary">
      <Link to={"/"}>
        <h1>
          <i className="fa fa-id-card-o" />
          <span className="m-1">Contact Keeper</span>
        </h1>
      </Link>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </header>
  );
};

export default Navbar;
