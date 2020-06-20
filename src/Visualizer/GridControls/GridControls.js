import React from "react";
// React Bootstrap.
import Row from "react-bootstrap/Row";
// Material UI.
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

function GridControls(props) {
  return (
    <Card className="text-center mx-auto w-75 my-3">
      <CardContent>
        <Typography className="font-weight-bold">Grid Controls</Typography>
        <Row className="d-flex justify-content-center my-3">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="symbols"
              name="symbols"
              value={props.currentSymbol}
              onChange={props.changeSymbol}
            >
              <FormControlLabel
                value="start"
                control={<Radio />}
                label="Start Node"
              />

              <FormControlLabel
                value="finish"
                control={<Radio />}
                label="Finish Node"
              />
              <FormControlLabel
                value="wall"
                control={<Radio />}
                label="Wall Node"
              />
            </RadioGroup>
          </FormControl>
        </Row>
      </CardContent>
    </Card>
  );
}

export default GridControls;
