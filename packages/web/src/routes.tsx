import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Play from "./pages/Play";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/play" component={Play} />
    </BrowserRouter>
  );
};

export default Routes;
