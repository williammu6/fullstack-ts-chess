import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const Home = () => {
  return (
    <div className="flex items-center justify-center content-center h-full">
      <Button>
        <Link to="/play">Play</Link>
      </Button>
    </div>
  );
};

export default Home;
