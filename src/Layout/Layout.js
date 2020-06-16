import React from "react";
import Wrapper from "../hoc/Wrapper";
import Header from "../Header/Header";

function Layout(props) {
  return (
    <Wrapper>
      <Header></Header>
      {props.children}
    </Wrapper>
  );
}

export default Layout;
