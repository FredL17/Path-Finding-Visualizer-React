import React from "react";
import Wrapper from "../hoc/Wrapper";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const layout = props => {
  return (
    <Wrapper>
      <Header></Header>
      <Container className="d-flex h-75 my-auto align-items-center">
        <Row className="w-100 mx-auto">
          <Col className="mw-75" md={8}>
            {props.children}
          </Col>
          <Col className="mw-25" md={4}>
            <Menu></Menu>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default layout;
