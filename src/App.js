import React, { Component } from "react";
import { Box } from "rebass";

import Calendar from "./containers/Calendar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Box>        
        <Calendar />
      </Box>
    );
  }
}

export default App;
