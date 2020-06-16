import React from "react";
// React bootstrap.
import Navbar from "react-bootstrap/Navbar";
// Image assets.
import logo from "../assets/images/logo.png";

function Header(props) {
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
}

export default Header;
