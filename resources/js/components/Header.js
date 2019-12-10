import React from 'react';
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="title-link">Birthdays Reminder</Link>
      <GoogleAuth />
    </div>
  );
};

export default Header;
