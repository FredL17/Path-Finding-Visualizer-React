import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/favicon-32x32.png";

const header = props => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="">
        <img
          alt="Path Finding Visualizer"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Path Finding Visualizer
      </Navbar.Brand>
    </Navbar>
  );
};

export default header;
