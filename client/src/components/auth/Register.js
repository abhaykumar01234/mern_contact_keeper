import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAlert, register, clearErrors } from "../../redux";

const Register = (props) => {
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists") {
      dispatch(setAlert(error, "danger"));
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, props.history, dispatch]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "")
      dispatch(setAlert("Please Enter All Fields", "danger"));
    else if (password !== password2)
      dispatch(setAlert("Passwords do not match", "danger"));
    else dispatch(register({ name, email, password }));
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            autoComplete={"none"}
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
            minLength={6}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
