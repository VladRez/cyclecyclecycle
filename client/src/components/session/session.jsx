import React from "react";
import { Link } from "react-router-dom";
import Demo from "../session/demo"
const Session = props => {
  return <div>
    <Link to="/login">Login</Link><br/>
    <Link to="/signup">Signup</Link><br/>
    <Demo/>

  </div>;
};

export default Session;
