// App.js

import React from "react";
import AppNavigation from "./stacknav";
import { emergencyLocations } from "./emergancylocations";

const App = () => {
  return <AppNavigation emergencyLocations={emergencyLocations} />;
};
export default App;
