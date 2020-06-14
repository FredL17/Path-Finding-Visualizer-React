import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const menu = props => {
  return (
    <Card className="text-center mx-auto w-75">
      <Card.Header>Menu</Card.Header>
      <Card.Body>
        <Row className="d-flex justify-content-center my-1">
          <Button className="w-50" variant="primary">
            Reset
          </Button>
        </Row>
        <Row className="d-flex justify-content-center my-1">
          <Button className="w-50" variant="primary">
            Start
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default menu;
