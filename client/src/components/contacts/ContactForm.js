import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addContact,
  updateContact,
  clearCurrent,
  filterContacts,
} from "../../redux";

const ContactForm = () => {
  const { current, filterText } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (current === null) {
      await dispatch(addContact(contact));
    } else {
      await dispatch(updateContact(contact));
    }
    if (filterText) dispatch(filterContacts(filterText));
    clearAll();
  };

  const clearAll = () => {
    dispatch(clearCurrent());
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        autoComplete={"off"}
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
        autoComplete={"off"}
      />
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={handleChange}
        placeholder="Phone"
        autoComplete={"off"}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        id="personal"
        value="personal"
        checked={type === "personal"}
        onChange={handleChange}
      />
      <label htmlFor="personal" className="m-1">
        Personal
      </label>
      <input
        type="radio"
        name="type"
        id="professional"
        value="professional"
        checked={type === "professional"}
        onChange={handleChange}
      />
      <label htmlFor="professional" className="m-1">
        Professional
      </label>
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
