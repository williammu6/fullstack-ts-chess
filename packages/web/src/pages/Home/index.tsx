import React from "react";

import { Link } from "react-router-dom";

import Button from "../../components/UI/Button";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-full">

      <Link to="/play">
        <Button>
          Play
        </Button>
      </Link>
    </div>
  );
};

export default Home;
