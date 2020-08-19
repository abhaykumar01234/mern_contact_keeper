import React from "react";

const About = () => {
  return (
    <div>
      <h1>About this app</h1>
      <p className="my-1">
        This is a full stack react app for keeping contacts
      </p>
      <p className="bg-dark p">
        <strong> Version :</strong> 1.0.0
      </p>
      <table>
        <tbody>
          <tr>
            <td>Developer</td>
            <td>
              :<strong style={{ paddingLeft: "1rem" }}>Abhay Kumar</strong>
            </td>
          </tr>
          <tr>
            <td>Created On</td>
            <td>
              :<strong style={{ paddingLeft: "1rem" }}>19 AUG 2020</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default About;
