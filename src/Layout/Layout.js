import React, { Fragment } from "react";
import Header from "../Header/Header";

function Layout(props) {
  return (
    <Fragment>
      <Header></Header>
      {props.children}
    </Fragment>
  );
}

export default Layout;
