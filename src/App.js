import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./Layout/Layout";
import Visualizer from "./Visualizer/Visualizer";

class App extends Component {
  render() {
    return (
      <Layout>
        <Visualizer></Visualizer>
      </Layout>
    );
  }
}

export default App;
