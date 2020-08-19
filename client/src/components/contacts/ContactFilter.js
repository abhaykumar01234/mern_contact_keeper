import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { filterContacts, clearFilter } from "../../redux";

const ContactFilter = () => {
  const { filtered } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      dispatch(filterContacts(e.target.value));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
