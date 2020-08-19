import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import About from "./components/pages/About";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Alerts />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
