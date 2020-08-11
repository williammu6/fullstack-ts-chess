import React, {useEffect} from "react";

import Routes from "./routes";

import { socket } from "./Game";

import "./global.css";

import "./tailwind.output.css";


function App() {
  useEffect(() => {

    return () => {
      console.log("Close");
      socket.close();
    }
  });
  return <Routes />;
}

export default App;
