import React from "react";
import { Link } from "react-router-dom";

const Session = props => {
  return <div>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
  </div>;
};

export default Session;
