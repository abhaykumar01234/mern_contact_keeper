import React from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteContact,
  setCurrent,
  clearCurrent,
  filterContacts,
} from "../../redux";

const ContactItem = ({ contact }) => {
  const { filterText } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const { _id, name, email, phone, type } = contact;

  const onDelete = async () => {
    await dispatch(deleteContact(_id));
    dispatch(clearCurrent());
    if (filterText) dispatch(filterContacts(filterText));
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fa fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fa fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => dispatch(setCurrent(contact))}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
