import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAlert, login, clearErrors } from "../../redux";

const Login = (props) => {
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      dispatch(setAlert(error, "danger"));
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, props.history, dispatch]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "")
      dispatch(setAlert("Please Enter All Fields", "danger"));
    else dispatch(login({ email, password }));
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete={"none"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength={6}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
