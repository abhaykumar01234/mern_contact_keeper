import React from "react";
import { useSelector } from "react-redux";

const Alerts = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    alerts.length > 0 &&
    alerts.map(({ id, type, message }) => (
      <div key={id} className={`alert alert-${type}`}>
        <i className="fa fa-info-circle" /> {message}
      </div>
    ))
  );
};

export default Alerts;
